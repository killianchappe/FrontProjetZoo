import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-update-login-pwd',
  templateUrl: './update-login-pwd.component.html',
  styleUrls: ['./update-login-pwd.component.scss']
})
export class UpdateLoginPwdComponent implements OnInit {

  idCourant: number;
  userCourant: User = new User();
  myForm: FormGroup;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getOne(this.idCourant).subscribe(data => {
      this.userCourant = data;
    });
    this.myForm = this.formBuilder.group({
      loginUser: ['', Validators.required],
      pwdUser: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateLogAndPwd(user: User) {
    this.userService.updateUser(user, this.idCourant).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/role'])
          }
        })
      }
    });
  }

}
