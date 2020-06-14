import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {global} from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})

export class AppComponent {
  title = 'frontend-proyecto';
  public identity;
  public urlImg;
  public token;

  constructor(public _userService:UserService){
    this.loadStorage();
    this.urlImg=global.url+'user/avatar/';
  }
  ngOnInit(){}

  ngDoCheck(){
    this.loadStorage();
  }
  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }
}
