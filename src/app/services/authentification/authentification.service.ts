import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  user: User = new User();

  constructor(private http: HttpClient,
    private router: Router) { }

  login(login, password) {
    this.loginWebService(login, password).subscribe(res => {
      if (res != null) {
        localStorage.setItem('currentUser', res['token']);
        if (localStorage.getItem('currentUser') != null) {
          Swal.fire({
            title: 'Connecté!',
            icon: 'success',
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/home']);
            }
          })
        }
      } else {
        Swal.fire({
          title: 'Login ou mot de passe introuvable, veuillez essayer à nouveau.',
          icon: 'error',
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/signin'])
          }
        })
      }
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  loginWebService(login, password) {
    this.user.loginUser = login;
    this.user.pwdUser = password;
    return this.http.post("http://localhost:8080/user/login", this.user).pipe();
  }

}
