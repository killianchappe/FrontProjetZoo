import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Secteur } from '../models/secteur';
import { SecteurService } from '../services/secteur/secteur.service';

@Component({
  selector: 'app-update-secteur',
  templateUrl: './update-secteur.component.html',
  styleUrls: ['./update-secteur.component.scss']
})
export class UpdateSecteurComponent implements OnInit {

  idCourant: number;
  secteurCourant: Secteur = new Secteur();
  myForm: FormGroup;

  constructor(private secteurService: SecteurService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.secteurService.getOne(this.idCourant).subscribe(data => {
      this.secteurCourant = data;
    });
    this.myForm = this.formBuilder.group({
      nomSecteur: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateSecteur(secteur: Secteur) {
    this.secteurService.updateSecteur(secteur, this.idCourant).subscribe(res => {
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

}
