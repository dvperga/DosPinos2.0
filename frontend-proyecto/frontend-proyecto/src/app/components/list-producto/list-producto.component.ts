import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { Producto } from '../../models/producto';
import { global } from '../../services/global';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Almacen } from '../../models/almacen';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css'],
  providers: [ProductoService,UserService,CategoriaService,AlmacenService, ProveedorService]
})
export class ListProductoComponent implements OnInit {
  public productos: Array<Producto>;
  public url;
  public token;
  public status;
  public identity;
  public categoria;
  public proveedor;
  public almacen;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _userService: UserService,
    private _categoriaService: CategoriaService,
    private _almacenService: AlmacenService,
    private _proveedorService: ProveedorService,
    private _router: Router
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.categoria=new Categoria(1,1,'','');
    this.almacen=new Almacen(1,'','','',1,null);
  }
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.getProductos();
  }
  getCategoria(id) {
      this._categoriaService.getCategoria(id).subscribe(
         response => {
          if (response.status == 'success') {
            this.categoria = response.data;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
  }

  getProveedor(id) {
      this._proveedorService.getProveedor(id).subscribe(
         response => {
          if (response.status == 'success') {
            this.proveedor = response.data;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );

  }

  getAlmacen(id) {
    this._route.params.subscribe(params => {
      this._almacenService.getAlmacen(id).subscribe(
         response => {
          if (response.status == 'success') {
            this.categoria = response.data;
          } else {
            console.log("error");
          }
        },
        error => {
          console.log(error);
          
        }
      );
    });
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
