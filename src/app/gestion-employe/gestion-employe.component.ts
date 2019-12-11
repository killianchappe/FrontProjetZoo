import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../services/user/user.service";
import { Router } from '@angular/router';
import { Secteur } from "../models/secteur";
import { SecteurService } from "../services/secteur/secteur.service";
import { Role } from "../models/role";
import { RoleService } from "../services/role/role.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-employe',
  templateUrl: './gestion-employe.component.html',
  styleUrls: ['./gestion-employe.component.scss']
})
export class GestionEmployeComponent implements OnInit {

  listEmployes: User[] = [];

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
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
          }
        })

      }
    })
  }

}
