import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class ProductoService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(producto, token): Observable<any> {
    let json = JSON.stringify(producto);
    let params = 'json=' + json;
    console.log(params);
    console.log(this.url);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'producto', params, { headers: cabeceras });
  }
  getProductos(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'producto', { headers: cabeceras });
  }
  getProducto(id): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'producto/' + id, { headers: encabezados });
  }
  update(token, producto, id): Observable<any> {
    let json = JSON.stringify(producto);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'producto/' + id, params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'producto/' + id, { headers: encabezados });
  }
}
