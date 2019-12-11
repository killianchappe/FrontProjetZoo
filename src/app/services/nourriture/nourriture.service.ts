import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nourriture } from "../../models/nourriture";

@Injectable({
  providedIn: 'root'
})
export class NourritureService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Nourriture[]>("http://localhost:8080/nourriture").pipe()
  }

  addNourriture(nourriture: Nourriture) {
    return this.http.post("http://localhost:8080/nourriture", nourriture).pipe()
  }

  getOne(id: number) {
    return this.http.get<Nourriture>("http://localhost:8080/nourriture/" + id).pipe()
  }

  deleteNourriture(id: number) {
    return this.http.delete("http://localhost:8080/nourriture/" + id).pipe()
  }

  updateNourriture(nourriture: Nourriture, id: number) {
    return this.http.put("http://localhost:8080/nourriture/" + id, nourriture).pipe()
  }

}
