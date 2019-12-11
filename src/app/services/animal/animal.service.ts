import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from "../../models/animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Animal[]>("http://localhost:8080/animal").pipe()
  }

  addAnimal(animal: Animal) {
    return this.http.post("http://localhost:8080/animal", animal).pipe()
  }

  getOne(id: number) {
    return this.http.get<Animal>("http://localhost:8080/animal/" + id).pipe()
  }

  deleteAnimal(id: number) {
    return this.http.delete("http://localhost:8080/animal/" + id).pipe()
  }

  updateAnimal(animal: Animal, id: number) {
    return this.http.put("http://localhost:8080/animal/" + id, animal).pipe()
  }

  setEnclos(idAnimal: number, idEnclos: number) {
    return this.http.put("http://localhost:8080/animal/" + idAnimal + "/setEnclos/" + idEnclos, "").pipe()
  }

  setNourriture(idAnimal: number, idNourriture: number) {
    return this.http.put("http://localhost:8080/animal/" + idAnimal + "/setNourriture/" + idNourriture, "").pipe()
  }

}
