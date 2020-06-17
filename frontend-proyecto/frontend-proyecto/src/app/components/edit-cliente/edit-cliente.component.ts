import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css'],
  providers: [UserService, ClienteService]
})
export class EditClienteComponent implements OnInit {
  public identity;
  public token;
  public resetVar=false;
  public cliente:Cliente;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _clienteService:ClienteService
  ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
   }

   getCliente():void{
     this._route.params.subscribe(params=>{
       let id=params['id'];
       console.log(id);
       this._clienteService.getCliente(id).subscribe(
         response=>{
          if(response.status=='success'){
            let c=response.data;
            console.log(c);
            this.cliente=new Cliente(c.id,c.cedula,c.nombre,c.apellidos,c.genero);
            console.log(this.cliente);
            this.status='success';
          }else{
            this._router.navigate(['/inicio']);
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

  ngOnInit(): void {
    this.resetVar=false;
    this.getCliente();
  }

  onSubmit(form){
    console.log(this.cliente);
    this._clienteService.update(this.token,this.cliente).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
          this._router.navigate(['/list-cliente']);
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

}
