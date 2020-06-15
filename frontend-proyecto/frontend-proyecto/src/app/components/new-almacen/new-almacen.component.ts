import { Component, OnInit } from '@angular/core';
import { Almacen } from '../../models/almacen';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-new-almacen',
  templateUrl: './new-almacen.component.html',
  styleUrls: ['./new-almacen.component.css'],
  providers: [UserService,AlmacenService]
})
export class NewAlmacenComponent implements OnInit {
  public identity;
  public token;
  public almacen:Almacen;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _almacenService:AlmacenService
  ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.almacen=new Almacen(1,'','','',1,null);
  }
  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(this.token);
    this._almacenService.create(this.almacen,this.token).subscribe(
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
