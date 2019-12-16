import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TableRoleComponent } from './table-role/table-role.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionEmployeComponent } from './gestion-employe/gestion-employe.component';
import { GestionTacheComponent } from './gestion-tache/gestion-tache.component';
import { GestionZooComponent } from './gestion-zoo/gestion-zoo.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from './home/home.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { UpdateSecteurComponent } from './update-secteur/update-secteur.component';
import { UpdateEnclosComponent } from './update-enclos/update-enclos.component';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';
import { UpdateLoginPwdComponent } from './update-login-pwd/update-login-pwd.component';
import { UpdateEmployeComponent } from './update-employe/update-employe.component';
import { UpdateTacheComponent } from './update-tache/update-tache.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TableRoleComponent,
    GestionEmployeComponent,
    GestionTacheComponent,
    GestionZooComponent,
    GestionStockComponent,
    CompteComponent,
    HomeComponent,
    UpdateStockComponent,
    UpdateSecteurComponent,
    UpdateEnclosComponent,
    UpdateAnimalComponent,
    UpdateLoginPwdComponent,
    UpdateEmployeComponent,
    UpdateTacheComponent,
    SigninComponent,
    RegisterComponent,
    CalendrierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
