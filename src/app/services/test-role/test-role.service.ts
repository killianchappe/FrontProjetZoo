import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class TestRoleService {

  isAdmin: Boolean = false;
  isManager: Boolean = false;
  role: Role;
  helper = new JwtHelperService();

  constructor(private router: Router) {
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        try {
          this.role = this.helper.decodeToken(localStorage.getItem('currentUser'))['roleUser']
        } catch (error) {
        }
        try {
          if (this.role.idRole == 1) {
            this.isAdmin = true;
            this.isManager = true;
          } else if (this.role.idRole == 2) {
            this.isAdmin = false;
            this.isManager = true;
          } else {
            this.isAdmin = false;
            this.isManager = false;
          }
        } catch (error) {
        }
      };
    });
  }

  getValuesAdmin() {
    try {
      this.role = this.helper.decodeToken(localStorage.getItem('currentUser'))['roleUser']
    } catch (error) {
    }
    try {
      if (this.role.idRole == 1) {
        this.isAdmin = true;
      } else if (this.role.idRole == 2) {
        this.isAdmin = false;
      } else {
        this.isAdmin = false;
      }
    } catch (error) {
    }
    return this.isAdmin;
  }

  getValuesManager() {
    try {
      this.role = this.helper.decodeToken(localStorage.getItem('currentUser'))['roleUser']
    } catch (error) {
    }
    try {
      if (this.role.idRole == 1) {
        this.isManager = true;
      } else if (this.role.idRole == 2) {
        this.isManager = true;
      } else {
        this.isManager = false;
      }
    } catch (error) {
    }
    return this.isManager;
  }

}