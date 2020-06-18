import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class CompraService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(post, token): Observable<any> {
    let json = JSON.stringify(post);
    let params = 'json=' + json;
    console.log(params);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'compra', params, { headers: cabeceras });
  }
  getCompras(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'compra', { headers: cabeceras });
  }
  getCompra(id): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'compra/' + id, { headers: encabezados });
  }
  update(token, post, id): Observable<any> {
    let json = JSON.stringify(post);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'compra/' + id, params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'compra/' + id, { headers: encabezados });
  }
}
