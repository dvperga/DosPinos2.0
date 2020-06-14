// genera servicio inyectable // se inyecta en el constructor de cada clase
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {global} from './global';
import { Proveedor } from '../models/proveedor';

@Injectable() export class ProveedorService{
    public url: string;
    constructor(public _http:HttpClient){
        this.url=global.url;
    }
    proveedorNew(proveedor,token):Observable<any>{
      let json = JSON.stringify(proveedor);
      let params = 'json='+json;
      let encabezados = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token', token);
      return this._http.post(this.url+'proveedor',params,{headers:encabezados});
    }
    update(token,proveedor, id): Observable<any> {
      let json = JSON.stringify(proveedor);
      let params = "json=" + json;
      let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
      return this._http.put(this.url + 'proveedor/' + id, params, { headers: encabezados });
    }
    delete(id, token): Observable<any> {
      let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
      return this._http.delete(this.url + 'proveedor/' + id, { headers: encabezados });
    }
    getProveedores(): Observable<any> {
      let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'proveedor', { headers: cabeceras });
    }
    getProveedor(id): Observable<any> {
      let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'proveedor/' + id, { headers: encabezados });
    }
}
