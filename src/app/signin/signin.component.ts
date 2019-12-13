import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  newUser: User = new User();
  myForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
    };
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      loginSignin: ['', Validators.required],
      pwdSignin: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  signIn() {
    console.log(this.newUser.loginUser);
    console.log(this.newUser.pwdUser);
    this.authentificationService.login(this.newUser.loginUser, this.newUser.pwdUser);
  }

}
