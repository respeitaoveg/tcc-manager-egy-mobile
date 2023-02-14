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
  token: string
}

export interface consultUser {
  cpfCnpj: string
  id: number
  nome: string
  roleGNFE: string
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

export interface requestConsultUser {
  login?: string
  nome?: string
  roleGD?: string
}

export interface responseConsultUser {
  usuariosAtivos: [
    {
      cpfCnpj: string
      id: number
      nome: string
      roleGNFE: string
    } | null
  ]
  usuariosBloqueados:
    | [
        {
          cpfCnpj: string
          id: number
          nome: string
          roleGNFE: string
        }
      ]
    | null
  usuariosInativos:
    | [
        {
          cpfCnpj: string
          id: number
          nome: string
          roleGNFE: string
        }
      ]
    | null
}

export interface requestRegisterUser {
  nome?: string
  cpfCnpj?: string
  bairro?: string
  cep?: string
  cidade?: string
  codigoIBGE?: string
  email?: string
  endereco?: string
  estado?: string
  login?: string
  numero: number
  roleGD?: string
  telefone?: string
}

export interface responseRegisterUser {
  body?: any
  statusCode?: string
}

export interface requestRegisterBudget {
  bandeira: string
  clienteId: number
  formaPagamento: string
  listaProdutoResponse: [
    {
      id: number
      quantidade: number
    }
  ]
}

export interface responseRegisterBudget {
  autor: {
    cpfCnpj: string
    id: number
    nome: string
    roleGNFE: 'ADMIN'
  }
  bandeira: 'MASTERCARD'
  cliente: {
    cpfCnpj: string
    id: number
    nome: string
    roleGNFE: 'ADMIN'
  }
  formadePagamento: 'DINHEIRO'
  id: number
  listaProdutoResponse: [
    {
      cod: string
      descricao: string
      estoqueAtual: number
      id: number
      imagemBase64: string
      nome: string
      nomeImagem: string
      unidadeMedida: 'CAIXA'
      valorUnidade: string
    }
  ]
  notaFiscal: {
    chaveAcesso: string
    dataCancelamento: string
    dataCriacao: string
    dataEnvio: string
    id: number
    protocolo: string
    protocoloCancelamento: string
    statusNotaFiscal: 'CONCLUIDO'
    xml: string
    xmlCancelamento: string
  }
}

export interface requestInvoice {
  budgetId: string
}

export interface responseInvoice {
  chaveAcesso: string,
  dataCancelamento: string,
  dataCriacao: string,
  dataEnvio: string,
  id: number,
  protocolo: string,
  protocoloCancelamento: string,
  statusNotaFiscal: "CONCLUIDO",
  xml: string,
  xmlCancelamento: string
}
