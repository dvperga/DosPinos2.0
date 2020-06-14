import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {ErrorComponent} from './components/error/error.component';
// user
import {RegisterComponent} from './components/register/register.component';
// almacen
import { NewAlmacenComponent } from './components/new-almacen/new-almacen.component';
import { ListAlmacenComponent } from './components/list-almacen/list-almacen.component';
// cliente
import { NewClienteComponent } from './components/new-cliente/new-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
// producto
import { NewProductoComponent } from './components/new-producto/new-producto.component';
import { ListProductoComponent } from './components/list-producto/list-producto.component';
// proveedor
import { NewProveedorComponent } from './components/new-proveedor/new-proveedor.component';
import { ListProveedorComponent } from './components/list-proveedor/list-proveedor.component';
// categoria
import { NewCategoriaComponent } from './components/new-categoria/new-categoria.component';
import { ListCategoriaComponent } from './components/list-categoria/list-categoria.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  // almacen
  {path: 'new-almacen', component: NewAlmacenComponent},
  {path: 'list-almacen', component: ListAlmacenComponent},
  // user
  {path: 'registro', component: RegisterComponent},
  // cliente
  {path: 'new-cliente', component: NewClienteComponent},
  {path: 'list-cliente', component: ListClienteComponent},
  // proveedor
  {path: 'new-proveedor', component: NewProveedorComponent},
  {path: 'list-proveedor', component: ListProveedorComponent},
  // producto
  {path: 'new-producto', component: NewProductoComponent},
  {path: 'list-producto', component: ListProductoComponent},
  // categoria
  {path: 'new-categoria', component: NewCategoriaComponent},
  {path: 'list-categoria', component: ListCategoriaComponent},
  // error
  { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
