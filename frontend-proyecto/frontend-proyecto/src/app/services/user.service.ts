// genera servicio inyectable // se inyecta en el constructor de cada clase
import {Injectable} from '@angular/core';
// HttpClient para las peticiones
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {global} from './global';

@Injectable() export class UserService{
    public url: string;
    public identity;
    public token;
    constructor(public http:HttpClient){
        this.url=global.url;
    }
    register(user):Observable<any>{
        // json
        let json = JSON.stringify(user);
        let params = 'json='+json;
        // crear header
        let encabezados = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        // si necesita enviar token
        // retornar el observable de la peticion
        // el obejto que va estar disponible en el ts
        return this.http.post(this.url+'user',params,{headers:encabezados});
    }

    signin(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let encabezados = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        return this.http.post(this.url+'user/login',params,{headers:encabezados});
    }

    update(user): Observable<any> {
      let json = JSON.stringify(user);
      let params = 'json=' + json;
      let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', this.token);
      return this.http.put(this.url + 'user/update', params, { headers: encabezados });
    }

    public getIdentity() {
      let ident = JSON.parse(localStorage.getItem('identity'));
      if (ident && ident != 'undefined') {
        this.identity = ident;
      }
      else {
        this.identity = null;
      }
      return this.identity;
    }
    public getToken() {
      let tk = localStorage.getItem('token');
      if (tk && tk != 'undefined') {
        this.token = tk;
      }
      else {
        this.token = null;
      }
      return this.token;
    }
    public loadIdentity() {
      console.log(this.token);
      let cabecera = new HttpHeaders().set('token', this.token);
      return this.http.get(this.url + 'user/getidentity', { headers: cabecera });
    }
}
