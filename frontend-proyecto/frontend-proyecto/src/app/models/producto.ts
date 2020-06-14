export class Producto{
  constructor(
      public id: number,
      public nombre: string,
      public precio: number,
      public existenciaActual: number,
      public maximo: number,
      public minimo: string,
      public idCategoria: number,
      public idAlmacen: number,
      public idProveedor: number,
      public imagen: string,
      public created_at: any
  ){}
}
