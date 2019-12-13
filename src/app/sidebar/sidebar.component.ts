import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role';
import { TestRoleService } from '../services/test-role/test-role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: Boolean = false;
  isManager: Boolean = false;

  constructor(private router: Router,
    private test: TestRoleService) {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
  }

  ngOnInit() {
  }

}
