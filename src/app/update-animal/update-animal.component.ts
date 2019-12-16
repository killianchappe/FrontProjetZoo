import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enclos } from '../models/enclos';
import { EnclosService } from "../services/enclos/enclos.service";
import { NourritureService } from "../services/nourriture/nourriture.service";
import { Nourriture } from "../models/nourriture";
import { Animal } from "../models/animal";
import { AnimalService } from '../services/animal/animal.service';
import { TestRoleService } from '../services/test-role/test-role.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.scss']
})
export class UpdateAnimalComponent implements OnInit {

  idCourant: number;
  animalCourant: Animal = new Animal();
  myForm: FormGroup;
  listEnclos: Enclos[] = [];
  listNourritures: Nourriture[] = [];
  isAdmin: Boolean;
  isManager: Boolean;

  constructor(private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private enclosService: EnclosService,
    private nourritureService: NourritureService,
    private test: TestRoleService) {
    this.isAdmin = this.test.getValuesAdmin();
    this.isManager = this.test.getValuesManager();
    if (this.isManager == false) {
      this.router.navigate(['/home']);
    };
  }

  ngOnInit() {
    this.idCourant = parseInt(this.route.snapshot.paramMap.get('id'));
    this.animalService.getOne(this.idCourant).subscribe(data => {
      this.animalCourant = data;
    });
    this.enclosService.getAll().subscribe(data => {
      this.listEnclos = data;
    });
    this.nourritureService.getAll().subscribe(data => {
      this.listNourritures = data;
    });
    this.myForm = this.formBuilder.group({
      nomAnimal: ['', Validators.required],
      especeAnimal: ['', Validators.required],
      ageAnimal: ['', Validators.required],
      enclosAnimal: ['', Validators.required],
      nourritureAnimal: ['', Validators.required],
    });
  }

  onReset() {
    this.myForm.reset();
  }

  updateAnimal(animal: Animal) {
    this.animalService.updateAnimal(animal, this.idCourant).subscribe(res => {
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

  byIdEnclos(e1: Enclos, e2: Enclos) {
    return e1['idEnclos'] === e2['idEnclos'];
  }

  byIdNourriture(n1: Nourriture, n2: Nourriture) {
    return n1['idNourriture'] === n2['idNourriture'];
  }

}
