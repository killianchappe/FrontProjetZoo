import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Nourriture } from '../models/nourriture';
import { NourritureService } from '../services/nourriture/nourriture.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {

  idCourant: number;
  nourritureCourante: Nourriture = new Nourriture();
  myForm: FormGroup;

  constructor(private nourritureService: NourritureService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.nourritureService.getOne(this.idCourant).subscribe(data => {
      this.nourritureCourante = data;
    });
    this.myForm = this.formBuilder.group({
      nomNourriture: ['', Validators.required],
      stockNourriture: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateNourriture(nourriture: Nourriture) {
    this.nourritureService.updateNourriture(nourriture, this.idCourant).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Modification effectuée!',
          icon: 'success',
          showCancelButton: true,
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'Voir la liste',
          cancelButtonText: 'Modifier à nouveau'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/stock'])
          }
        })
      }
    });
  }

}
