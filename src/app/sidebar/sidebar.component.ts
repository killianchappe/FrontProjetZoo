import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestRoleService } from '../services/test-role/test-role.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from "sweetalert2";
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: Boolean = false;
  isManager: Boolean = false;
  idCompte: number;
  helper = new JwtHelperService();

  constructor(private authentificationService: AuthentificationService,
    private router: Router,
    private test: TestRoleService) {
  }

  ngOnInit() {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    try {
      this.idCompte = this.helper.decodeToken(localStorage.getItem('currentUser'))['idUser'];
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
