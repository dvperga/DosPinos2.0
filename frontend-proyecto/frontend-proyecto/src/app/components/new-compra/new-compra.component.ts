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
  public clientes;

  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _detalleService: DetalleService,
    private _userService: UserService,
    private _compraService: CompraService,
    private _clienteService: ClienteService,
    private _router: Router
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.compra=new Compra(1,1,1,1,null);
  }
  ngOnInit(): void {
    this.getClientes();
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
          form.reset();
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

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este detalle?')) {
      this._detalleService.delete(id, this.token).subscribe(
        response => {
          if (response.status == "success") {
            this.status = response.status;
          } else {
            this.status = "error";
          }
        },
        error => {
          this.status = "error";
          console.log(error);
        }
      );
    }
  }
}
