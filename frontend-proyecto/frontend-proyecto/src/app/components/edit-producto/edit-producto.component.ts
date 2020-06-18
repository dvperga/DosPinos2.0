import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { UserService} from '../../services/user.service';
import { AlmacenService } from '../../services/almacen.service';
import { ProveedorService } from '../../services/proveedor.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from '../../models/producto';
import { global } from '../../services/global';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css'],
  providers:[UserService,CategoriaService,AlmacenService,ProveedorService,ProductoService]
})
export class EditProductoComponent implements OnInit {

  public categorias;
  public proveedores;
  public almacenes;
  public resetVar=false;
  public token;
  public status:string;
  public producto;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _categoriaService: CategoriaService,
    private _proveedorService: ProveedorService,
    private _almacenService: AlmacenService,
    private _productoService: ProductoService
  ) { 
    this.token=this._userService.getToken();
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "5",
    uploadAPI:  {
      url:global.url+'producto/upload',
      headers: {
        "token" :localStorage.getItem('token')
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube imagen',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  getProducto():void{
    this._route.params.subscribe(
      params=>{
        let id=params['id'];
        this._productoService.getProducto(id).subscribe(
          response=>{
            if(response.status=='success'){
              let p=response.data;
              console.log(p);
              this.producto=new Producto(
                p.id,
                p.nombre,
                p.precio,
                p.existenciaActual,
                p.maximo,
                p.minimo,
                p.idCategoria,
                p.idAlmacen,
                p.idProveedor,
                p.imagen,
                p.created_at
                );
                console.log(this.producto);
                this.status='success';
            }else{
              this._router.navigate(['/list-producto']);
              console.log(response);
            }
          },
          error=>{
            this.status='error';
            console.log(error);
          }
        );
      }
    );
  }

  getCategorias(){
    this._categoriaService.getCategorias().subscribe(
      response=>{
        if(response.status=='success'){
          this.categorias=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }
  getAlmacenes(){
    this._almacenService.getAlmacenes().subscribe(
      response=>{
        if(response.status=='success'){
          this.almacenes=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }
  getProveedores(){
    this._proveedorService.getProveedores().subscribe(
      response=>{
        if(response.status=='success'){
          this.proveedores=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }

  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.producto.image=data.image;
  }

  ngOnInit(): void {
    this.resetVar=false;
    this.getProducto();
    this.getCategorias();
    this.getAlmacenes();
    this.getProveedores();
  }

  onSubmit(form){
    console.log(this.producto);
    this._productoService.update(this.token,this.producto).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }

}
