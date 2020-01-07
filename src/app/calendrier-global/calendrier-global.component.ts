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
import Swal from 'sweetalert2';
import { EtatService } from '../services/etat/etat.service';
import { Etat } from '../models/etat';

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
  newTache2: Tache = new Tache();
  myFormTache2: FormGroup;
  listEtats: Etat[] = [];
  showModal: Boolean = false;

  constructor(private tacheService: TacheService,
    private test: TestRoleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private etatService: EtatService) {
    this.userService.getAll().subscribe(data => {
      this.listEmployes = data;
    });
    this.etatService.getAll().subscribe(data => {
      this.listEtats = data;
    });
    this.myForm = this.formBuilder.group({
      idEmploye: ['', Validators.required],
    });
    this.myFormTache2 = this.formBuilder.group({
      libelleTache2: ['', Validators.required],
      commentaireTache2: ['', Validators.required],
      dateTache2: ['', Validators.required],
      dureeTache2: ['', Validators.required],
      userTache2: ['', Validators.required],
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
      timeZone: 'UTC-1',
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

  ajoutTache2() {
    this.newTache2.etatTache = this.listEtats[0];
    this.tacheService.addTache(this.newTache2).subscribe(res => {
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

  handleDateClick() {
    this.newTache2.libelleTache = null;
    this.newTache2.commentaireTache = null;
    this.newTache2.dureeTache = null;
    this.newTache2.dateTache = null;
    for (let employe of this.listEmployes) {
      if (employe.idUser == this.idEmploye) {
        this.newTache2.userTache = employe;
      }
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
