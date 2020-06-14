import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProveedorService } from '../../services/proveedor.service';


@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
  providers: [UserService,ProveedorService]
})
export class NewProveedorComponent implements OnInit {
  public identity;
  public token;
  public proveedor: Proveedor;
  public status: string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _proveedorService:ProveedorService
  ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.proveedor=new Proveedor(1,1,'','','','',1,'');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.token);
    this._proveedorService.proveedorNew(this.proveedor,this.token).subscribe(
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
