import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { CategoriaService } from '../../services/categoria.service';

import { Router, ActivatedRoute } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { ProveedorService } from '../../services/proveedor.service';
import { CompraService } from '../../services/compra.service';
import { DetalleService } from '../../services/detalle.service';

import { Producto } from '../../models/producto';
import { Compra } from '../../models/compra';
import { Detalle } from '../../models/detalle';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-new-compra',
  templateUrl: './new-compra.component.html',
  styleUrls: ['./new-compra.component.css'],
  providers: [ProductoService,UserService,CompraService,DetalleService, ClienteService]
})
export class NewCompraComponent implements OnInit {
  public compra;
  public detalles: Array<Detalle>;
  public detalle;
  public clientes;
  public productos;

  public creado:boolean;
  public IdentityCompra:number;
  public totalDetalle:number;

  public url;
  public token;

  public status;
  public statusDetalle:string;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _detalleService: DetalleService,
    private _userService: UserService,
    private _compraService: CompraService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _router: Router
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.compra=new Compra(1,this.identity.sub,1,1,null);
    this.detalle=new Detalle(1,1,1,1,1);
  }
  ngOnInit(): void {
    this.getClientes();
    this.getDetalles();
    this.getProductos();
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.getDetalles();
  }

  getClientes(){
    this._clienteService.getClientes().subscribe(
      response=>{
        if(response.status=='success'){
          this.clientes=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }
  getProductos(){
    this._productoService.getProductos().subscribe(
      response=>{
        if(response.status=='success'){
          this.productos=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }

  getDetalles() {
    this._detalleService.getDetalles().subscribe(
      response => {
        if (response.status == "success") {
          this.detalles = response.data;
          console.log(this.detalles);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(form){
    this._compraService.create(this.compra,this.token).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          console.log(response.identityCompra);
          this.creado=true;
          this.IdentityCompra=response.identityCompra;
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }

  crearDetalle(form ){
    console.log(form);
    this.detalle.idCompra=this.IdentityCompra;
    this._detalleService.create(this.detalle,this.token).subscribe(
      response=>{
        if(response.status=="success"){
          this.statusDetalle= response.status;
          form.reset();
        }else{
          this.statusDetalle="error";
        }
      },
      error=>{
        this.statusDetalle=error;
        console.log(error);
      }
    );

  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este detalle?')) {
      this._detalleService.delete(id, this.token).subscribe(
        response => {
          if (response.status == "success") {
            this.status= response.status;
            console.log(response);
          } else {
            this.status = "error";
          }
        },
        error => {
          this.statusDetalle = error;
          console.log(error);
        }
      );
    }
  }
}
