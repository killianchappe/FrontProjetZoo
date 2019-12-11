import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Nourriture } from "../models/nourriture";
import { NourritureService } from "../services/nourriture/nourriture.service"

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.scss']
})
export class GestionStockComponent implements OnInit {

  listNourritures: Nourriture[] = [];
  newNourriture: Nourriture = new Nourriture();
  myForm: FormGroup;

  constructor(private router: Router,
    private nourritureService: NourritureService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.nourritureService.getAll().subscribe(data => {
      this.listNourritures = data;
    });
    this.myForm = this.formBuilder.group({
      nomNourriture: ['', Validators.required],
      stockNourriture: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  deleteNourriture(id: number, index) {
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
        this.nourritureService.deleteNourriture(id).subscribe(res => {
          if (res) {
            this.ngOnInit();
          } else {
            Swal.fire({
              title: 'Vous ne pouvez pas faire ça : des animaux mange ce type de nourriture!',
              icon: 'warning',
              confirmButtonText: 'OK',
            })
          }
        })

      }
    })
  }

  ajoutNourriture() {
    this.nourritureService.addNourriture(this.newNourriture).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Aliment ajouté!',
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
