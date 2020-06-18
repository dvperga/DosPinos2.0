
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { Producto,ProductoShow } from '../../models/producto';
import { global } from '../../services/global';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-list-compra',
  templateUrl: './list-compra.component.html',
  styleUrls: ['./list-compra.component.css'],
  providers: [ProductoService,UserService,CompraService, ProveedorService]
})
export class ListCompraComponent implements OnInit {
  public compras: Compra;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _userService: UserService,
    private _compraService: CompraService,
    private _router: Router
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.getCompras();
  }

  getCompras() {
    this._compraService.getCompras().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.compras = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar esta compra?')) {
      this._compraService.delete(id, this.token).subscribe(
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
