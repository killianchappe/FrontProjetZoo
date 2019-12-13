import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  prenom: String;
  helper = new JwtHelperService();

  constructor(private authentificationService: AuthentificationService,
    private router: Router) { }

  ngOnInit() {
    try {
      this.prenom = this.helper.decodeToken(localStorage.getItem('currentUser'))['prenomUser'];
    } catch (error) {
    }
  }

  logout() {
    Swal.fire({
      title: 'Voulez-vous vraiment vous déconnecter?',
      icon: 'question',
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.authentificationService.logout();
        this.router.navigate(['/signin']);
      }
    })
  }

}
