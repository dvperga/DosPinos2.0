import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { global } from '../../services/global';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css'],
  providers: [CategoriaService, UserService]
})
export class ListCategoriaComponent implements OnInit {
  public categorias: Array<Categoria>;
  public url;
  public token;
  public status;
  public identity;

  constructor(
    private _categoriaService: CategoriaService,
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
    this.getCategorias();
  }

  getCategorias() {
    this._categoriaService.getCategorias().subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.categorias = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    if (confirm('¿Esta seguro que desea eliminar esta categoria?')) {
      this._categoriaService.delete(id, this.token).subscribe(
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

