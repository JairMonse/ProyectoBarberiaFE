import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/login/crear-usuario/crear-usuario.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { MenuComponent } from './components/menu/menu.component';
import { CitasComponent } from './components/citas/citas.component';
import { AuthenticationComponent } from './admins/page/authentication/authentication.component';
import { NavigatorComponent } from './admins/page/navigator/navigator.component';
import { TableBarberosComponent } from './admins/components/barberos/table-barberos/table-barberos.component';
import { BarberosPageComponent } from './components/barberos-page/barberos-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ListadoCitasComponent } from './components/citas/listado-citas/listado-citas.component';
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

const routes: Routes = [

  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  {
    path: 'login', component: LoginComponent,
    children: [
      { path: 'crear-usuario', component: CrearUsuarioComponent },
    ]
  },
  { path: 'cliente', component: ClienteComponent },


  {path: 'citas', component: CitasComponent},
  {path: 'listCitas', component: ListadoCitasComponent },
  {path:'editarCitas/:id',component:CitasComponent},
  {path:'verCitas/:id',component:VerCitasComponent},


  {path: 'inventario', component: InventarioComponent},
  {path: 'listInventario', component: ListadoInventarioComponent },
  {path:'editarInventario/:id',component: InventarioComponent},
  {path:'verInventario/:id',component: VerInventarioComponent},

  {path: 'ventas', component: VentasComponent},
  {path: 'listVentas', component: ListadoVentasComponent },
  {path:'editarVenta/:id',component: VentasComponent},
  {path:'verVenta/:id',component: VerVentasComponent},

  {path: 'tienda', component: TiendaComponent},
  
  {path: 'carrito', component: CarritoComponent},
  {path: 'listCarrito', component: ListadoCarritoComponent },
  {path:'editarCarrito/:id',component: CarritoComponent},
  {path:'verCarrito/:id',component: VerCarritoComponent},

  {path: 'nosotros', component: NosotrosComponent},
  
  { path: 'login-admins', component: AuthenticationComponent },
  { path: 'barberos', component: BarberosPageComponent },
  {
    path: 'dashboard',
    component: NavigatorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'custom-barberos', pathMatch: 'full' },
      { path: 'custom-barberos', component: TableBarberosComponent }
    ]
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
