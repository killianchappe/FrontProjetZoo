import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'FrontProjetZoo';
  isLogin: Boolean = false;
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
          console.log(this.role.idRole)
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
        console.log(event['url'])
        if (event['url'] == '/signin' || event['url'] == '/register') {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      };
    });

  }

}



