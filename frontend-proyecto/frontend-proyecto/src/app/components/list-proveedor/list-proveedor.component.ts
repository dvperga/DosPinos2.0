import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { UserService } from '../../services/user.service';
import { Proveedor } from '../../models/proveedor';
import { global } from '../../services/global';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css'],
  providers: [ProveedorService,UserService]
})
export class ListProveedorComponent implements OnInit {
  public proveedores: Array<Proveedor>;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _proveedorService: ProveedorService,
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
    this.getProveedores();
  }

  getProveedores() {
    this._proveedorService.getProveedores().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.proveedores = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este proveedor?')) {
      this._proveedorService.delete(id, this.token).subscribe(
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
