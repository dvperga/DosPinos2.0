import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing' ;

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

// user
import { RegisterComponent } from './components/register/register.component';
// cliente
import { NewClienteComponent } from './components/new-cliente/new-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
// proveedor
import { NewProveedorComponent } from './components/new-proveedor/new-proveedor.component';
import { ListProveedorComponent } from './components/list-proveedor/list-proveedor.component';
// almacen
import { NewAlmacenComponent } from './components/new-almacen/new-almacen.component';
import { ListAlmacenComponent } from './components/list-almacen/list-almacen.component';
// categoria
import { NewCategoriaComponent } from './components/new-categoria/new-categoria.component';
import { ListCategoriaComponent } from './components/list-categoria/list-categoria.component';
// producto
import { NewProductoComponent } from './components/new-producto/new-producto.component';
import { ListProductoComponent } from './components/list-producto/list-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    NewClienteComponent,
    NewProveedorComponent,
    NewAlmacenComponent,
    NewCategoriaComponent,
    NewProductoComponent,
    ListClienteComponent,
    ListProveedorComponent,
    ListAlmacenComponent,
    ListCategoriaComponent,
    ListProductoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
