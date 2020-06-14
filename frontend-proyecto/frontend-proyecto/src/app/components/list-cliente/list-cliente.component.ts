import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { UserService } from '../../services/user.service';
import { Cliente } from '../../models/cliente';
import { global } from '../../services/global';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css'],
  providers: [ClienteService, UserService]
})
export class ListClienteComponent implements OnInit {
  public clientes: Array<Cliente>;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _clienteService: ClienteService,
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
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.clientes = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar este cliente?')) {
      this._clienteService.delete(id, this.token).subscribe(
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


