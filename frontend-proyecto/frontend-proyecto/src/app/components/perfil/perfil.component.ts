import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers:[UserService]
})
export class PerfilComponent implements OnInit {
  public identity;
  public urlImg;
  public token;
  public times;

  constructor(
    public _userService:UserService,
    ){
    this.loadStorage();
    this.times=0;
  }

  ngOnInit(){
    this.times=0;
  }
  ngDoCheck(){
    this.times++;
    console.log(this.times);
    if(this.times>1){
      this.loadStorage();
      this.times=0;
    }
  }
  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }
}
