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

export interface completeUser {
  bairro: string
  cep: string
  cidade: string
  stringcodigoIBGE: string
  cpfCnpj: string
  email: string
  endereco: string
  estado: string
  id: string
  login: string
  nome: string
  numero: number
  roleGD: string
  telefone: string
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

export interface cart {
  product: product
  quantity: number
}