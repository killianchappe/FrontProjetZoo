import { Component, OnInit } from '@angular/core';
import { EventInput, OptionsInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Tache } from '../models/tache';
import { TacheService } from '../services/tache/tache.service';
import { TestRoleService } from '../services/test-role/test-role.service';
import allLocales from '@fullcalendar/core/locales-all';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-calendrier-global',
  templateUrl: './calendrier-global.component.html',
  styleUrls: ['./calendrier-global.component.scss']
})
export class CalendrierGlobalComponent implements OnInit {

  listTaches: Tache[] = [];
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  options: OptionsInput;
  heureDebut: number;
  heureFin: number;
  debut: Date = new Date();
  fin: Date = new Date();
  idEmploye: number;
  myForm: FormGroup;
  listEmployes: User[] = [];

  constructor(private tacheService: TacheService,
    private test: TestRoleService,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.userService.getAll().subscribe(data => {
      this.listEmployes = data;
    });
    this.myForm = this.formBuilder.group({
      idEmploye: ['', Validators.required],
    });
  }

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
    while (this.calendarEvents.length != 0) {
      this.calendarEvents.shift();
    };
    this.tacheService.getAll().subscribe(data => {
      this.listTaches = data;
      for (let tache of this.listTaches) {
        if (this.idEmploye == tache.userTache.idUser) {
          this.debut = new Date(tache.dateTache);
          this.heureDebut = this.debut.getHours();
          this.heureFin = this.heureDebut + tache.dureeTache;
          this.fin = new Date(tache.dateTache);
          this.fin.setHours(this.heureFin);
          this.calendarEvents = this.calendarEvents.concat({
            title: tache.libelleTache + " - " + tache.userTache.prenomUser + " "
              + tache.userTache.nomUser + " - Commentaire : " + tache.commentaireTache + " - Durée estimée : "
              + tache.dureeTache + " h - Etat : " + tache.etatTache.libelleEtat,
            start: tache.dateTache,
            end: this.fin,
          });
        };
      };
    });
  }

}
