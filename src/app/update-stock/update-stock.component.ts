import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Nourriture } from '../models/nourriture';
import { NourritureService } from '../services/nourriture/nourriture.service';
import { TestRoleService } from "../services/test-role/test-role.service";

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {

  idCourant: number;
  nourritureCourante: Nourriture = new Nourriture();
  myForm: FormGroup;
  isAdmin: Boolean;
  isManager: Boolean;

  constructor(private nourritureService: NourritureService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private test: TestRoleService) { }

  ngOnInit() {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    console.log(this.isAdmin);
    console.log(this.isManager);
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
          showCancelButton: false,
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/stock'])
          }
        })
      }
    });
  }

}
