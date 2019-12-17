import { Component, OnInit } from '@angular/core';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import { TestRoleService } from '../services/test-role/test-role.service';
import { Etat } from '../models/etat';
import { EtatService } from '../services/etat/etat.service';

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
    private etatService: EtatService) {
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

  updateEtat(idTache: number) {
    for (let tache of this.listTaches) {
      if (idTache == tache.idTache) {
        if (tache.etatTache.idEtat == 1) {
          tache.etatTache = this.listEtats[1];
          this.tacheService.setEtat(idTache, 2).subscribe();
        } else if (tache.etatTache.idEtat == 2) {
          tache.etatTache = this.listEtats[2];
          this.tacheService.setEtat(idTache, 3).subscribe();
        } else {
          tache.etatTache = this.listEtats[0];
          this.tacheService.setEtat(idTache, 1).subscribe();
        }
      }
    }
  }

}
