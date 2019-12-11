import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Secteur } from "../../models/secteur";

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Secteur[]>("http://localhost:8080/secteur").pipe()
  }

  addSecteur(secteur: Secteur) {
    return this.http.post("http://localhost:8080/secteur", secteur).pipe()
  }

  getOne(id: number) {
    return this.http.get<Secteur>("http://localhost:8080/secteur/" + id).pipe()
  }

  deleteSecteur(id: number) {
    return this.http.delete("http://localhost:8080/secteur/" + id).pipe()
  }

  updateSecteur(secteur: Secteur, id: number) {
    return this.http.put("http://localhost:8080/secteur/" + id, secteur).pipe()
  }

}
