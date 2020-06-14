import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { Producto } from '../../models/producto';
import { global } from '../../services/global';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css'],
  providers: [ProductoService,UserService]
})
export class ListProductoComponent implements OnInit {
  public productos: Array<Producto>;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _productoService: ProductoService,
    private _userService: UserService
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.productos = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este producto?')) {
      this._productoService.delete(id, this.token).subscribe(
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
