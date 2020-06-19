import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoriaService } from '../../services/categoria.service';


@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.css'],
  providers: [UserService,CategoriaService]
})
export class NewCategoriaComponent implements OnInit {
  public identity;
  public token;
  public categoria:Categoria;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _categoriaService:CategoriaService
  ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.categoria=new Categoria(1,1,'','');
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(this.token);
    this._categoriaService.create(this.categoria,this.token).subscribe(
      response=>{
        if (response.status == 'success'){
        console.log(response);
        this.status = response.status;
        form.reset();
      }else{
        this.status = "Error";
      }
      },
      error=>{
        this.status=error;
      }
    );
  }
}
