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
import { UpdateLoginPwdComponent } from "./update-login-pwd/update-login-pwd.component";
import { UpdateEmployeComponent } from "./update-employe/update-employe.component";
import { UpdateTacheComponent } from "./update-tache/update-tache.component";
import { SigninComponent } from "./signin/signin.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";


const routes: Routes = [
  {
    path: "role",
    component: TableRoleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "employe",
    component: GestionEmployeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "tache",
    component: GestionTacheComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "zoo",
    component: GestionZooComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "stock",
    component: GestionStockComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "compte/:id",
    component: CompteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updatestock/:id",
    component: UpdateStockComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updatesecteur/:id",
    component: UpdateSecteurComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updateenclos/:id",
    component: UpdateEnclosComponent,
  },
  {
    path: "updateanimal/:id",
    component: UpdateAnimalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updateloginpwd/:id",
    component: UpdateLoginPwdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updateemploye/:id",
    component: UpdateEmployeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "updatetache/:id",
    component: UpdateTacheComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
