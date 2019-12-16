import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestRoleService } from '../services/test-role/test-role.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private router: Router,
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

}
