import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.scss']
})
export class UpdateTacheComponent implements OnInit {

  idCourant: number;
  tacheCourante: Tache = new Tache();
  myForm: FormGroup;
  listEtats: Etat[] = [];
  listUsers: User[] = [];

  constructor(private tacheService: TacheService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private etatService: EtatService,
    private userService: UserService) { }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.tacheService.getOne(this.idCourant).subscribe(data => {
      this.tacheCourante = data;
    });
    this.etatService.getAll().subscribe(data => {
      this.listEtats = data;
    });
    this.userService.getAll().subscribe(data => {
      this.listUsers = data;
    });
    this.myForm = this.formBuilder.group({
      libelleTache: ['', Validators.required],
      commentaireTache: ['', Validators.required],
      dateTache: ['', Validators.required],
      dureeTache: ['', Validators.required],
      userTache: ['', Validators.required],
      etatTache: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateTache(tache: Tache) {
    this.tacheService.updateTache(tache, this.idCourant).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/tache'])
          }
        })
      }
    });
  }

  byIdUser(u1: User, u2: User) {
    return u1['idUser'] === u2['idUser'];
  }

  byIdEtat(e1: Etat, e2: Etat) {
    return e1['idEtat'] === e2['idEtat'];
  }

}
