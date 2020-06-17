import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable() export class CategoriaService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  create(categoria, token): Observable<any> {
    let json = JSON.stringify(categoria);
    let params = 'json=' + json;
    console.log(params);
    console.log(this.url);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.post(this.url + 'categoria', params, { headers: cabeceras });
  }
  getCategorias(): Observable<any> {
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categoria', { headers: cabeceras });
  }
  getCategoria(id): Observable<any> {
    return this._http.get(this.url + 'categoria/' + id);
  }
  update(token, categoria, id): Observable<any> {
    let json = JSON.stringify(categoria);
    let params = "json=" + json;
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.put(this.url + 'categoria/1', params, { headers: encabezados });
  }
  delete(id, token): Observable<any> {
    let encabezados = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('token', token);
    return this._http.delete(this.url + 'categoria/'+id, { headers: encabezados });
  }
}
