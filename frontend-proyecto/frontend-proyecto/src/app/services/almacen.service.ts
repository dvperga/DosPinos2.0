import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class AlmacenService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(almacen, token): Observable<any> {
    let json = JSON.stringify(almacen);
    let params = 'json=' + json;
    console.log(params);
    console.log(this.url);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'almacen', params, { headers: cabeceras });
  }
  getAlmacenes(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'almacen', { headers: cabeceras });
  }
  getAlmacen(id): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'almacen/' + id, { headers: encabezados });
  }
  update(token, almacen, id): Observable<any> {
    let json = JSON.stringify(almacen);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'almacen/' + id, params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'almacen/' + id, { headers: encabezados });
  }
}
