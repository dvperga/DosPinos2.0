import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css'],
  providers:[UserService,CategoriaService]
})
export class EditCategoriaComponent implements OnInit {

  public token;
  public resetVar=false;
  public categoria:Categoria;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _categoriaService:CategoriaService
  ) { 
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.resetVar=false;
    this.getCategoria();
  }

  onSubmit(form){
    console.log(this.categoria);
    this._categoriaService.update(this.token,this.categoria).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
          this._router.navigate(['/list-categoria']);
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

  getCategoria():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._categoriaService.getCategoria(id).subscribe(
        response=>{
          if(response.status=='success'){
            let c=response.data;
            console.log(c);
            this.categoria=new Categoria(c.id,c.bloque,c.nombre,c.descripcion);
            console.log(this.categoria);
            this.status="false";
          }else{
            this._router.navigate(['/list-categoria']);
            console.log(response);
          }
        },
        error=>{

        }
      );
    });
  }

}
