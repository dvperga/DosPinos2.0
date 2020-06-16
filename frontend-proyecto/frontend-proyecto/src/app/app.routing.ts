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
import { EditAlmacenComponent } from './components/edit-almacen/edit-almacen.component';
// cliente
import { NewClienteComponent } from './components/new-cliente/new-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
import { EditClienteComponent } from './components/edit-cliente/edit-cliente.component';
// producto
import { NewProductoComponent } from './components/new-producto/new-producto.component';
import { ListProductoComponent } from './components/list-producto/list-producto.component';
// proveedor
import { NewProveedorComponent } from './components/new-proveedor/new-proveedor.component';
import { ListProveedorComponent } from './components/list-proveedor/list-proveedor.component';
// categoria
import { NewCategoriaComponent } from './components/new-categoria/new-categoria.component';
import { ListCategoriaComponent } from './components/list-categoria/list-categoria.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  // user
  {path: 'login', component: LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'edit-perfil',component: EditPerfilComponent },
  // almacen
  {path: 'new-almacen', component: NewAlmacenComponent},
  {path: 'list-almacen', component: ListAlmacenComponent},
  {path: 'edit-almacen/:id', component: EditAlmacenComponent},
  // user
  {path: 'registro', component: RegisterComponent},
  // cliente
  {path: 'new-cliente', component: NewClienteComponent},
  {path: 'list-cliente', component: ListClienteComponent},
  {path: 'edit-cliente/:id', component: EditClienteComponent},
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
