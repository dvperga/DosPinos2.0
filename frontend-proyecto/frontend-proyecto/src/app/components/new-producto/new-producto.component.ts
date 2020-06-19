import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { UserService} from '../../services/user.service';
import { AlmacenService } from '../../services/almacen.service';
import { ProveedorService } from '../../services/proveedor.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { global } from '../../services/global';
import { from } from 'rxjs';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css'],
  providers:[
    UserService,
    CategoriaService,
    AlmacenService,
    ProveedorService,
    ProductoService]
})
export class NewProductoComponent implements OnInit {
  public categorias;
  public proveedores;
  public almacenes;
  public resetVar=false;
  public token;
  public status:string;
  public producto;

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _categoriaService: CategoriaService,
    private _proveedorService: ProveedorService,
    private _almacenService: AlmacenService,
    private _productoService: ProductoService)
    {
      this.token=this._userService.getToken();
      this.producto=new Producto(1,'',1,1,1,'',1,1,1,null,null);
    }

  ngOnInit(): void {
    this.getCategorias();
    this.getAlmacenes();
    this.getProveedores();
    this.resetVar = false;
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
    this.producto.imagen=data.imagen;
  }

  onSubmit(form){
    console.log(form);
    this._productoService.create(this.producto,this.token).subscribe(
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
