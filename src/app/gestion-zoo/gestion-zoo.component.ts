import { Component, OnInit } from '@angular/core';
import { Secteur } from "../models/secteur";
import { Enclos } from "../models/enclos";
import { Animal } from "../models/animal";
import { Nourriture } from "../models/nourriture";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SecteurService } from "../services/secteur/secteur.service";
import { EnclosService } from "../services/enclos/enclos.service";
import { AnimalService } from "../services/animal/animal.service";
import { NourritureService } from "../services/nourriture/nourriture.service";
import { TestRoleService } from "../services/test-role/test-role.service";

@Component({
  selector: 'app-gestion-zoo',
  templateUrl: './gestion-zoo.component.html',
  styleUrls: ['./gestion-zoo.component.scss']
})
export class GestionZooComponent implements OnInit {

  listAnimaux: Animal[] = [];
  listEnclos: Enclos[] = [];
  listSecteurs: Secteur[] = [];
  listNourritures: Nourriture[] = [];
  newAnimal: Animal = new Animal();
  newEnclos: Enclos = new Enclos();
  newSecteur: Secteur = new Secteur();
  myFormAnimal: FormGroup;
  myFormEnclos: FormGroup;
  myFormSecteur: FormGroup;
  isAdmin: Boolean;
  isManager: Boolean;

  constructor(private router: Router,
    private secteurService: SecteurService,
    private enclosService: EnclosService,
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private nourritureService: NourritureService,
    private test: TestRoleService) { }

  ngOnInit() {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    this.secteurService.getAll().subscribe(data => {
      this.listSecteurs = data;
    });
    this.animalService.getAll().subscribe(data => {
      this.listAnimaux = data;
    });
    this.enclosService.getAll().subscribe(data => {
      this.listEnclos = data;
    });
    this.nourritureService.getAll().subscribe(data => {
      this.listNourritures = data;
    });
    this.myFormSecteur = this.formBuilder.group({
      nomSecteur: ['', Validators.required],
    });
    this.myFormEnclos = this.formBuilder.group({
      nomEnclos: ['', Validators.required],
      capaciteEnclos: ['', Validators.required],
      secteurEnclos: ['', Validators.required],
    });
    this.myFormAnimal = this.formBuilder.group({
      nomAnimal: ['', Validators.required],
      especeAnimal: ['', Validators.required],
      ageAnimal: ['', Validators.required],
      enclosAnimal: ['', Validators.required],
      nourritureAnimal: ['', Validators.required],
    });
  }

  onResetAnimal() {
    this.myFormAnimal.reset();
  }

  onResetEnclos() {
    this.myFormEnclos.reset();
  }

  onResetSecteur() {
    this.myFormSecteur.reset();
  }

  deleteSecteur(id: number, index) {
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
        this.secteurService.deleteSecteur(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          } else {
            Swal.fire({
              title: 'Vous ne pouvez pas faire ça : des employés ou des enclos appartiennent à ce secteur!',
              icon: 'warning',
              confirmButtonText: 'OK',
            })
          }
        })
      }
    })
  }

  deleteEnclos(id: number, index) {
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
        this.enclosService.deleteEnclos(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          } else {
            Swal.fire({
              title: 'Vous ne pouvez pas faire ça : des animaux appartiennent à cet enclos!',
              icon: 'warning',
              confirmButtonText: 'OK',
            })
          }
        })
      }
    })
  }

  deleteAnimal(id: number, index) {
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
        this.animalService.deleteAnimal(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          }
        })
      }
    })
  }

  ajoutSecteur() {
    this.secteurService.addSecteur(this.newSecteur).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Secteur ajouté!',
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

  ajoutEnclos() {
    this.enclosService.addEnclos(this.newEnclos).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Enclos ajouté!',
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

  ajoutAnimal() {
    this.animalService.addAnimal(this.newAnimal).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Animal ajouté!',
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

}