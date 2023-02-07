export interface api {
  login(login: string, password: string): Promise<user | undefined>
  logout(): Promise<undefined>
  products(params: any): Promise<product[] | undefined>
}

export interface user {
  nome: string
  email: string
  roleGNFE: string
  dataExpiracaoSenha: string
}

export interface product {
  id: string
  cod: string
  descricao: string
  estoqueAtual: string
  imagemBase64: string
  nome: string
  nomeImagem: string
  unidadeMedida: string
  valorUnidade: string
}