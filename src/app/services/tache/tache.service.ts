import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tache } from "../../models/tache";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tache[]>("http://localhost:8080/tache").pipe()
  }

  addTache(tache: Tache) {
    return this.http.post("http://localhost:8080/tache", tache).pipe()
  }

  getOne(id: number) {
    return this.http.get<Tache>("http://localhost:8080/tache/" + id).pipe()
  }

  deleteTache(id: number) {
    return this.http.delete("http://localhost:8080/tache/" + id).pipe()
  }

  updateTache(tache: Tache, id: number) {
    return this.http.put("http://localhost:8080/tache/" + id, tache).pipe()
  }

  setUser(idTache: number, idUser: number) {
    return this.http.put("http://localhost:8080/tache/" + idTache + "/setUser/" + idUser, "").pipe()
  }

  setEtat(idTache: number, idEtat: number) {
    return this.http.put("http://localhost:8080/tache/" + idTache + "/setEtat/" + idEtat, "").pipe()
  }

}
