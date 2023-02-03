export interface api {
  login(login: string, password: string): Promise<user | undefined>
  logout(): Promise<undefined>
}

export interface user {
  nome: string,
  email: string,
  roleGNFE: string,
  dataExpiracaoSenha: string
}