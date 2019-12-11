import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableRoleComponent } from "../app/table-role/table-role.component";
import { GestionEmployeComponent } from './gestion-employe/gestion-employe.component';
import { GestionTacheComponent } from './gestion-tache/gestion-tache.component';
import { GestionZooComponent } from './gestion-zoo/gestion-zoo.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from "./home/home.component";
import { UpdateStockComponent } from "./update-stock/update-stock.component";
import { UpdateSecteurComponent } from "./update-secteur/update-secteur.component";
import { UpdateEnclosComponent } from "./update-enclos/update-enclos.component";
import { UpdateAnimalComponent } from "./update-animal/update-animal.component";

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
  },
  {
    path: "updatestock/:id",
    component: UpdateStockComponent,
  },
  {
    path: "updatesecteur/:id",
    component: UpdateSecteurComponent,
  },
  {
    path: "updateenclos/:id",
    component: UpdateEnclosComponent,
  },
  {
    path: "updateanimal/:id",
    component: UpdateAnimalComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
