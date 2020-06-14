export class Compra{
  constructor(
      public id: number,
      public idUsuario: number,
      public idCliente: number,
      public total: number,
      public created_at: any
  ){}
}
