import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Secteur } from '../models/secteur';
import { SecteurService } from '../services/secteur/secteur.service';
import { User } from '../models/user';
import { UserService } from "../services/user/user.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Role } from '../models/role';
import { RoleService } from '../services/role/role.service';
import { TestRoleService } from '../services/test-role/test-role.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  idCourant: number;
  listSecteurs: Secteur[] = [];
  listRoles: Role[] = [];
  userCourant: User = new User();
  myForm: FormGroup;
  idSecure: number;

  constructor(private secteurService: SecteurService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private test: TestRoleService) {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.idSecure = this.test.getValueIdCourant();
    if (this.idSecure != this.idCourant) {
      this.router.navigate(['/home']);
    };
  }

  ngOnInit() {
    this.userService.getOne(this.idCourant).subscribe(data => {
      this.userCourant = data;
    });
    this.secteurService.getAll().subscribe(data => {
      this.listSecteurs = data;
    });
    this.roleService.getAll().subscribe(data => {
      this.listRoles = data;
    });
    this.myForm = this.formBuilder.group({
      nomUser: ['', Validators.required],
      prenomUser: ['', Validators.required],
      emailUser: ['', Validators.required],
      secteurUser: ['', Validators.required],
      loginUser: ['', Validators.required],
      pwdUser: ['', Validators.required],
      roleUser: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateUser(user: User) {
    this.userService.updateUser(user, this.idCourant).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
          }
        })
      }
    });
  }

  byIdSecteur(s1: Secteur, s2: Secteur) {
    return s1['idSecteur'] === s2['idSecteur'];
  }

  byIdRole(r1: Role, r2: Role) {
    return r1['idRole'] === r2['idRole'];
  }

}
