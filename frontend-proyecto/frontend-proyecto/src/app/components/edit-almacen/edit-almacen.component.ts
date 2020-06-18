import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlmacenService } from '../../services/almacen.service';
import { Almacen } from '../../models/almacen';
import { global } from '../../services/global';


@Component({
  selector: 'app-edit-almacen',
  templateUrl: './edit-almacen.component.html',
  styleUrls: ['./edit-almacen.component.css'],
  providers: [UserService, AlmacenService]
})
export class EditAlmacenComponent implements OnInit {
  public status;
  public identity;
  public token;
  public almacen: Almacen;
  public resetVar=false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _almacenService: AlmacenService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.resetVar=false;
    this.getAlmacen();
  }

  getAlmacen() {
    this._route.params.subscribe(params => {
      let id =params['id'];
      this._almacenService.getAlmacen(id).subscribe(
         response => {
          if (response.status == 'success') {
            let a = response.data;
            console.log(a);
            this.almacen=new Almacen(a.id,a.ubicacion,a.encargado,a.nombre,a.telefono,a.created_at);
            console.log(this.almacen);
            this.status='false';
          } else {
            this._router.navigate(['/list-almacen']);
          }
        },
        error => {
          this.status='error';
          console.log(error);
          this._router.navigate(['/list-almacen']);
        }
      );
    });
  }
  onSubmit(form){
    console.log(this.token);
    this._almacenService.update(this.token, this.almacen).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
          this._router.navigate(['/list-almacen']);
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
