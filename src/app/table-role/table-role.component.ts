import { Component, OnInit } from '@angular/core';
import { Role } from "../models/role";
import { RoleService } from "../services/role/role.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from "../models/user";
import { UserService } from "../services/user/user.service";

@Component({
  selector: 'app-table-role',
  templateUrl: './table-role.component.html',
  styleUrls: ['./table-role.component.scss']
})
export class TableRoleComponent implements OnInit {

  listRoles: Role[] = [];
  listUsers: User[] = [];
  newRole: Role = new Role();
  myForm: FormGroup;

  constructor(private router: Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.roleService.getAll().subscribe(data => {
      this.listRoles = data;
    });
    this.userService.getAll().subscribe(data => {
      this.listUsers = data;
    });
    this.myForm = this.formBuilder.group({
      libelleRole: ['', Validators.required],
    })
  }

  onReset() {
    this.myForm.reset();
  }

  deleteRole(id: number, index) {
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
        this.roleService.deleteRole(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
            this.router.navigate(['/role']);
          } else {
            Swal.fire({
              title: 'Vous ne pouvez pas faire ça : ce rôle est attribué à au moins une personne!',
              icon: 'warning',
              confirmButtonText: 'OK',
            })
          }
        })

      }
    })
  }

  ajoutRole() {
    this.roleService.addRole(this.newRole).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Rôle ajouté!',
          icon: 'success',
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
        })
      }
    });
  }

  passerManager(user: User, id: number) {
    user.roleUser.idRole = 2;
    this.userService.updateUser(user, id).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCancelButton: false,
          showCloseButton: false,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
        })
      }
    })
  }

  passerEmploye(user: User, id: number) {
    user.roleUser.idRole = 3;
    this.userService.updateUser(user, id).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCancelButton: false,
          showCloseButton: false,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
        })
      }
    })
  }

}