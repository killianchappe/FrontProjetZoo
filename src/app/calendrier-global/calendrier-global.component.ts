import { Component, OnInit } from '@angular/core';
import { EventInput, OptionsInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import { TestRoleService } from '../services/test-role/test-role.service';
import allLocales from '@fullcalendar/core/locales-all';

@Component({
  selector: 'app-calendrier-global',
  templateUrl: './calendrier-global.component.html',
  styleUrls: ['./calendrier-global.component.scss']
})
export class CalendrierGlobalComponent implements OnInit {

  listTaches: Tache[] = [];
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
  ];
  options: OptionsInput;

  heureDebut: number;
  heureFin: number;
  debut: Date = new Date();
  fin: Date = new Date();

  constructor(private tacheService: TacheService,
    private test: TestRoleService) { }

  ngOnInit() {
    this.options = {
      weekends: false,
      minTime: '06:00:00',
      maxTime: '21:00:00',
      eventColor: 'orange',
      allDaySlot: false,
      locales: allLocales,
      locale: 'fr',
    };
    this.tacheService.getAll().subscribe(data => {
      this.listTaches = data;
      for (let tache of this.listTaches) {
        this.debut = new Date(tache.dateTache);
        this.heureDebut = this.debut.getHours();
        this.heureFin = this.heureDebut + tache.dureeTache;
        this.fin = new Date(tache.dateTache);
        this.fin.setHours(this.heureFin);
        console.log(this.fin)
        this.calendarEvents = this.calendarEvents.concat({
          title: tache.libelleTache + " - " + tache.userTache.prenomUser + " "
            + tache.userTache.nomUser + " - Commentaire : " + tache.commentaireTache + " - Durée estimée : "
            + tache.dureeTache + " h - Etat : " + tache.etatTache.libelleEtat,
          start: tache.dateTache,
          end: this.fin,
        });
      };
    });
  }

}
