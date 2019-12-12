import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Secteur } from '../models/secteur';
import { SecteurService } from '../services/secteur/secteur.service';
import { Enclos } from '../models/enclos';
import { EnclosService } from "../services/enclos/enclos.service";

@Component({
  selector: 'app-update-enclos',
  templateUrl: './update-enclos.component.html',
  styleUrls: ['./update-enclos.component.scss']
})
export class UpdateEnclosComponent implements OnInit {

  idCourant: number;
  enclosCourant: Enclos = new Enclos();
  myForm: FormGroup;
  listSecteurs: Secteur[] = [];

  constructor(private secteurService: SecteurService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private enclosService: EnclosService) { }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.enclosService.getOne(this.idCourant).subscribe(data => {
      this.enclosCourant = data;
    });
    this.secteurService.getAll().subscribe(data => {
      this.listSecteurs = data;
    })
    this.myForm = this.formBuilder.group({
      nomEnclos: ['', Validators.required],
      capaciteEnclos: ['', Validators.required],
      secteurEnclos: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateEnclos(enclos: Enclos) {
    this.enclosService.updateEnclos(enclos, this.idCourant).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/zoo'])
          }
        })
      }
    });
  }

  byIdSecteur(s1: Secteur, s2: Secteur) {
    return s1['idSecteur'] === s2['idSecteur'];
  }

}