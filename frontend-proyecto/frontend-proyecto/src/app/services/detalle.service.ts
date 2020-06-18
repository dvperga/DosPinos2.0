import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class DetalleService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(detalle, token): Observable<any> {
    let json = JSON.stringify(detalle);
    let params = 'json=' + json;
    console.log(params);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'detalle', params, { headers: cabeceras });
  }
  getDetalles(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'detalle', { headers: cabeceras });
  }
  getDetalle(id): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'detalle/' + id, { headers: encabezados });
  }
  update(token, detalle, id): Observable<any> {
    let json = JSON.stringify(detalle);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'detalle/' + id, params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'detalle/' + id, { headers: encabezados });
  }
}
