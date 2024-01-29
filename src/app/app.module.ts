import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/login/crear-usuario/crear-usuario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { CitasComponent } from './components/citas/citas.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigatorComponent } from './admins/page/navigator/navigator.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationComponent } from './admins/page/authentication/authentication.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableBarberosComponent } from './admins/components/barberos/table-barberos/table-barberos.component';
import { AddEditBarberosComponent } from './admins/components/barberos/add-edit-barberos/add-edit-barberos.component';
import { InfoBarberosComponent } from './admins/components/barberos/info-barberos/info-barberos.component';
import { DeleteBarberosComponent } from './admins/components/barberos/delete-barberos/delete-barberos.component';
import { ExperienciaPipe } from './core/pipes/experiencia.pipe';
import { BarberosPageComponent } from './components/barberos-page/barberos-page.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { ListadoCitasComponent } from './components/citas/listado-citas/listado-citas.component';


import { SharedModule } from './shared/shared.module';
import { VerCitasComponent } from './components/citas/ver-citas/ver-citas.component';
import { ListadoInventarioComponent } from './components/inventario/listado-inventario/listado-inventario.component';
import { VerInventarioComponent } from './components/inventario/ver-inventario/ver-inventario.component';
import { ListadoVentasComponent } from './components/ventas/listado-ventas/listado-ventas.component';
import { VerVentasComponent } from './components/ventas/ver-ventas/ver-ventas.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarritoComponent } from './components/tienda/carrito/carrito.component';
import { ListadoCarritoComponent } from './components/tienda/carrito/listado-carrito/listado-carrito.component';
import { VerCarritoComponent } from './components/tienda/carrito/ver-carrito/ver-carrito.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClienteComponent,
    LoginComponent,
    CrearUsuarioComponent,
    VentasComponent,
    InventarioComponent,
    CitasComponent,
    MenuComponent,
    NavigatorComponent,
    AuthenticationComponent,
    TableBarberosComponent,
    AddEditBarberosComponent,
    InfoBarberosComponent,
    DeleteBarberosComponent,
    ExperienciaPipe,
    BarberosPageComponent,
    ListadoCitasComponent,
    VerCitasComponent,
    ListadoInventarioComponent,
    VerInventarioComponent,
    ListadoVentasComponent,
    VerVentasComponent,
    TiendaComponent,
    CarritoComponent,
    ListadoCarritoComponent,
    VerCarritoComponent,
    NosotrosComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatRadioModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,

    NgxMaterialTimepickerModule,
    HttpClientModule,
    SharedModule 

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
