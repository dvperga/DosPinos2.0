import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlmacenService } from '../../services/almacen.service';
import { global } from '../../services/global';
import { Almacen } from '../../models/almacen';

@Component({
  selector: 'app-list-almacen',
  templateUrl: './list-almacen.component.html',
  styleUrls: ['./list-almacen.component.css'],
  providers: [AlmacenService, UserService]
})
export class ListAlmacenComponent implements OnInit {
  public almacenes: Array<Almacen>;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _almacenService: AlmacenService,
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
    this.getAlmaceness();
  }

  getAlmaceness() {
    this._almacenService.getAlmacenes().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.almacenes = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este almacen?')) {
      this._almacenService.delete(id, this.token).subscribe(
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
