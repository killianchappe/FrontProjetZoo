import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import Swal from 'sweetalert2';
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';

@Component({
  selector: 'app-gestion-tache',
  templateUrl: './gestion-tache.component.html',
  styleUrls: ['./gestion-tache.component.scss']
})
export class GestionTacheComponent implements OnInit {

  listUsers: User[] = [];
  listEtats: Etat[] = [];
  listTaches: Tache[] = [];
  newTache: Tache = new Tache();
  myFormTache: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tacheService: TacheService,
    private etatService: EtatService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.listUsers = data;
    });
    this.etatService.getAll().subscribe(data => {
      this.listEtats = data;
    });
    this.tacheService.getAll().subscribe(data => {
      this.listTaches = data;
    });
    this.myFormTache = this.formBuilder.group({
      libelleTache: ['', Validators.required],
      commentaireTache: ['', Validators.required],
      dateTache: ['', Validators.required],
      dureeTache: ['', Validators.required],
      userTache: ['', Validators.required],
    });
  }

  onResetTache() {
    this.myFormTache.reset();
  }

  ajoutTache() {
    this.newTache.etatTache = this.listEtats[0];
    this.tacheService.addTache(this.newTache).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Tâche ajoutée!',
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

  deleteTache(id: number, index) {
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
        this.tacheService.deleteTache(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          }
        })
      }
    })
  }


}
