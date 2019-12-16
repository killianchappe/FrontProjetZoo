import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Secteur } from '../models/secteur';
import { SecteurService } from '../services/secteur/secteur.service';
import { User } from '../models/user';
import { UserService } from "../services/user/user.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { TestRoleService } from '../services/test-role/test-role.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.scss']
})
export class UpdateEmployeComponent implements OnInit {

  idCourant: number;
  listSecteurs: Secteur[] = [];
  userCourant: User = new User();
  myForm: FormGroup;
  isAdmin: Boolean;
  isManager: Boolean;

  constructor(private secteurService: SecteurService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private test: TestRoleService) {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    if (this.isManager == false) {
      this.router.navigate(['/home']);
    };
  }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getOne(this.idCourant).subscribe(data => {
      this.userCourant = data;
    });
    this.secteurService.getAll().subscribe(data => {
      this.listSecteurs = data;
    });
    this.myForm = this.formBuilder.group({
      nomUser: ['', Validators.required],
      prenomUser: ['', Validators.required],
      emailUser: ['', Validators.required],
      secteurUser: ['', Validators.required],
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
            this.router.navigate(['/employe'])
          }
        })
      }
    });
  }

  byIdSecteur(s1: Secteur, s2: Secteur) {
    return s1['idSecteur'] === s2['idSecteur'];
  }

}
