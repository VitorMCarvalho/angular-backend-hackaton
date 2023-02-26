export interface User{
  id?: number,
  nome: string,
  login: string,
  email: string,
  senha?:string,
  dataNascimento?: string,
}
