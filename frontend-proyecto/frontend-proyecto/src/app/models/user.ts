export class User{
  constructor(
      public id: number,
      public cedula: number,
      public nombre: string,
      public apellidos: string,
      public role: string,
      public correo: string,
      public password: string
  ){}
}
