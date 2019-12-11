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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
