import { Component, OnInit } from '@angular/core';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import { TestRoleService } from '../services/test-role/test-role.service';
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-taches',
  templateUrl: './mes-taches.component.html',
  styleUrls: ['./mes-taches.component.scss']
})
export class MesTachesComponent implements OnInit {

  listEtats: Etat[] = [];
  listTaches: Tache[] = [];
  idSecure: number;

  constructor(private tacheService: TacheService,
    private test: TestRoleService,
    private etatService: EtatService,
    private router: Router) {
    this.idSecure = this.test.getValueIdCourant();
  }

  ngOnInit() {
    this.tacheService.getAll().subscribe(data => {
      this.listTaches = data;
    });
    this.etatService.getAll().subscribe(data => {
      this.listEtats = data;
    })
  }

  updateAfaire(idTache: number) {
    for (let tache of this.listTaches) {
      if (idTache == tache.idTache) {
        tache.etatTache = this.listEtats[0];
        this.tacheService.setEtat(idTache, 1).subscribe();
      }
    }
  }

  updateEncours(idTache: number) {
    for (let tache of this.listTaches) {
      if (idTache == tache.idTache) {
        tache.etatTache = this.listEtats[1];
        this.tacheService.setEtat(idTache, 2).subscribe();
      }
    }
  }

  updateTermine(idTache: number) {
    for (let tache of this.listTaches) {
      if (idTache == tache.idTache) {
        tache.etatTache = this.listEtats[2];
        this.tacheService.setEtat(idTache, 3).subscribe();
      }
    }
  }

}
