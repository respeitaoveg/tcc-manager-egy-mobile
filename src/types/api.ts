export interface api {
  login(login: string, password: string): Promise<user | undefined>
  logout(): Promise<undefined>
  products(params: any): Promise<product[] | undefined>
}

export interface user {
  nome: string,
  email: string,
  roleGNFE: string,
  dataExpiracaoSenha: string
}

export interface product {
  nome: string,
  quantidade: number
}