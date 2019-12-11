import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from "../../models/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Role[]>("http://localhost:8080/role").pipe()
  }

  addRole(role: Role) {
    return this.http.post("http://localhost:8080/role", role).pipe()
  }

  getOne(id: number) {
    return this.http.get<Role>("http://localhost:8080/role/" + id).pipe()
  }

  deleteRole(id: number) {
    return this.http.delete("http://localhost:8080/role/" + id).pipe()
  }

  updateRole(role: Role, id: number) {
    return this.http.put("http://localhost:8080/role/" + id, role).pipe()
  }

}
