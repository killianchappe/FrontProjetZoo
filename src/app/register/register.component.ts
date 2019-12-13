import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user";
import { UserService } from "../services/user/user.service";
import { Secteur } from "../models/secteur";
import { SecteurService } from "../services/secteur/secteur.service";
import { Role } from "../models/role";
import { RoleService } from "../services/role/role.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  listRoles: Role[] = [];
  listSecteurs: Secteur[] = [];
  newUser: User = new User();
  myForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private secteurService: SecteurService,
    private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getAll().subscribe(data => {
      this.listRoles = data;
    });
    this.secteurService.getAll().subscribe(data => {
      this.listSecteurs = data;
    });
    this.myForm = this.formBuilder.group({
      nomRegister: ['', Validators.required],
      prenomRegister: ['', Validators.required],
      emailRegister: ['', Validators.required],
      loginRegister: ['', Validators.required],
      pwdRegister: ['', Validators.required],
    })
  }

  onReset() {
    this.myForm.reset();
  }

  register() {
    this.newUser.roleUser = this.listRoles[2];
    this.newUser.secteurUser = this.listSecteurs[0];
    this.userService.addUser(this.newUser).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Compte créé avec succès!',
          icon: 'success',
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
        })
      }
    });
  }

}
