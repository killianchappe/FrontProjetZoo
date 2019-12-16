import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../services/user/user.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TestRoleService } from '../services/test-role/test-role.service';

@Component({
  selector: 'app-gestion-employe',
  templateUrl: './gestion-employe.component.html',
  styleUrls: ['./gestion-employe.component.scss']
})
export class GestionEmployeComponent implements OnInit {

  listEmployes: User[] = [];
  isAdmin: Boolean;
  isManager: Boolean;

  constructor(private router: Router,
    private userService: UserService,
    private test: TestRoleService) { }

  ngOnInit() {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    this.userService.getAll().subscribe(data => {
      this.listEmployes = data;
    });
  }

  deleteEmploye(id: number, index) {
    Swal.fire({
      title: 'Voulez-vous vraiment faire cela?',
      icon: 'question',
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          } else {
            Swal.fire({
              title: 'Vous ne pouvez pas faire ça : cet employé a des tâches en cours!',
              icon: 'warning',
              confirmButtonText: 'OK',
            })
          }
        })
      }
    })
  }

}
