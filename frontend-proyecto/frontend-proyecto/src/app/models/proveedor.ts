export class Proveedor{
  constructor(
      public id: number,
      public cedula: number,
      public nombre: string,
      public diaEntrega: string,
      public direccion: string,
      public correo: string,
      public telefono: number,
      public razonSocial: string,
  ){}
}
