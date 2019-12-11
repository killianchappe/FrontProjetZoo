import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableRoleComponent } from "../app/table-role/table-role.component";
import { GestionEmployeComponent } from './gestion-employe/gestion-employe.component';
import { GestionTacheComponent } from './gestion-tache/gestion-tache.component';
import { GestionZooComponent } from './gestion-zoo/gestion-zoo.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
  {
    path: "role",
    component: TableRoleComponent,
  },
  {
    path: "employe",
    component: GestionEmployeComponent,
  },
  {
    path: "tache",
    component: GestionTacheComponent,
  },
  {
    path: "zoo",
    component: GestionZooComponent,
  },
  {
    path: "stock",
    component: GestionStockComponent,
  },
  {
    path: "compte",
    component: CompteComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
