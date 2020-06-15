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
  public is_edit: boolean;
  public url: string;
  public identity;
  public token;
  public page_title: string;
  public almacen: Almacen;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _almacenService: AlmacenService
  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.url = global.url;
  }

  ngOnInit() {
    this.almacen = new Almacen(1,'', '', '', 1,null);
    this.getAlmacen();
  }

  getAlmacen() {
    this._route.params.subscribe(params => {
      let id = + params['id'];
      this._almacenService.getAlmacen(id).subscribe(
         response => {
          if (response.status == 'success') {
            this.almacen = response.data;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }
  onSubmit(form){
    console.log(this.token);
    this._almacenService.update(this.token, this.almacen, this.almacen.id).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
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
