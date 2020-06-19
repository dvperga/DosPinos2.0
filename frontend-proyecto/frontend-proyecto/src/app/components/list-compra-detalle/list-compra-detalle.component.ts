import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CompraService } from '../../services/compra.service';
import { DetalleService } from '../../services/detalle.service';
import { Compra } from '../../models/compra';
import { Detalle } from '../../models/detalle';

@Component({
  selector: 'app-list-compra-detalle',
  templateUrl: './list-compra-detalle.component.html',
  styleUrls: ['./list-compra-detalle.component.css'],
  providers:[UserService,CompraService,DetalleService,DetalleService]
})
export class ListCompraDetalleComponent implements OnInit {
public identity;
  public urlImg;
  public token;
  public times;
  public status;
  public compra:Compra;
  public detalles: Array<Detalle>;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    public _userService:UserService,
    public _compraService:CompraService,
    private _detalleService: DetalleService
    ){
  }
  ngOnInit(){
    this.getCompra();
  }
  ngDoCheck(){
    this.getDetalles();
  }
  getCompra():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this._compraService.getCompra(id).subscribe(
        response=>{
          if(response.status=='success'){
            let p=response.data;
            console.log(p);
            this.compra=new Compra(p.id,p.idUsuario,p.idCliente,p.total,p.created_at);
              console.log(this.compra);
          }else{
            this._router.navigate(['/list-compra']);
            console.log(response);
          }
        },
        error=>{
          this.status='error';
          console.log(error);
        }
      );
    });
  }
  getDetalles() {
    this._detalleService.getDetalles().subscribe(
      response => {
        if (response.status == "success") {
          this.detalles = response.data;
          console.log(this.detalles);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
