import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css'],
  providers: [UserService, ClienteService]
})
export class NewClienteComponent implements OnInit {
  public identity;
  public token;
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
    this.cliente=new Cliente(1,1,'','','');
  }
  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.token);
    this._clienteService.create(this.cliente,this.token).subscribe(
      response=>{
        this.status='success';
        this._router.navigate(['/inicio']);
      },
      error=>{
        this.status='error';
      }
    );
  }
}
