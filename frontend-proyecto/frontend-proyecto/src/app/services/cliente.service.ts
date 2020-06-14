import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class ClienteService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(cliente, token): Observable<any> {
    let json = JSON.stringify(cliente);
    let params = 'json=' + json;
    console.log(params);
    console.log(this.url);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'cliente', params, { headers: cabeceras });
  }
  getClientes(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'cliente', { headers: cabeceras });
  }
  getCliente(id): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'cliente/' + id, { headers: encabezados });
  }
  update(token, cliente, id): Observable<any> {
    let json = JSON.stringify(cliente);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'cliente/' + id, params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'cliente/' + id, { headers: encabezados });
  }
}
