import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etat } from "../../models/etat";

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Etat[]>("http://localhost:8080/etat").pipe()
  }

  addEtat(etat: Etat) {
    return this.http.post("http://localhost:8080/etat", etat).pipe()
  }

  getOne(id: number) {
    return this.http.get<Etat>("http://localhost:8080/etat/" + id).pipe()
  }

  deleteEtat(id: number) {
    return this.http.delete("http://localhost:8080/etat/" + id).pipe()
  }

  updateEtat(etat: Etat, id: number) {
    return this.http.put("http://localhost:8080/etat/" + id, etat).pipe()
  }

}
