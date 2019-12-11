import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enclos } from "../../models/enclos"

@Injectable({
  providedIn: 'root'
})
export class EnclosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Enclos[]>("http://localhost:8080/enclos").pipe()
  }

  addEnclos(enclos: Enclos) {
    return this.http.post("http://localhost:8080/enclos", enclos).pipe()
  }

  getOne(id: number) {
    return this.http.get<Enclos>("http://localhost:8080/enclos/" + id).pipe()
  }

  deleteEnclos(id: number) {
    return this.http.delete("http://localhost:8080/enclos/" + id).pipe()
  }

  updateEnclos(enclos: Enclos, id: number) {
    return this.http.put("http://localhost:8080/enclos/" + id, enclos).pipe()
  }

  setSecteur(idEnclos: number, idSecteur: number) {
    return this.http.put("http://localhost:8080/enclos/" + idEnclos + "/setSecteur/" + idSecteur, "").pipe()
  }

}
