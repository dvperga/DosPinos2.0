import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css'],
  providers:[UserService,ProveedorService]
})
export class EditProveedorComponent implements OnInit {

  public token;
  public resetVar=false;
  public proveedor:Proveedor;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _proveedorService:ProveedorService
  ) { 
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.resetVar=false;
    this.getProveedor();
  }

  onSubmit(form){
    console.log(this.proveedor);
    this._proveedorService.update(this.token,this.proveedor).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
          this._router.navigate(['/list-proveedor']);
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

  getProveedor():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._proveedorService.getProveedor(id).subscribe(
        response=>{
          if(response.status=='success'){
            let p=response.data;
            console.log(p);
            this.proveedor=new Proveedor(p.id,p.cedula,p.nombre,p.diaEntrega,p.direccion,
              p.correo,p.telefono,p.razonSocial);
              console.log(this.proveedor);
          }else{
            this._router.navigate(['/list-proveedor']);
            console.log(response);
          }
        },
        error=>{
          this.status='error';
          console.log(error);
        }
      );
    });
  }

}
