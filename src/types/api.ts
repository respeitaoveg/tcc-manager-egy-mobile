export interface api {
  login(login: string, password: string): Promise<user | undefined>
  logout(): Promise<void>
  products(params: any): Promise<product[] | undefined>
}

export interface user {
  nome: string
  email: string
  roleGNFE: 'ADMIN' | 'FUNCIONARIO' | 'FORNECEDOR' | 'CLIENTE'
  dataExpiracaoSenha: string
  token: string
}

export interface consultUser {
  cpfCnpj: string
  id: number
  nome: string
  roleGNFE: 'ADMIN' | 'FUNCIONARIO' | 'FORNECEDOR' | 'CLIENTE'
}

export interface product {
  cod: string
  descricao: string
  estoqueAtual: number
  id: number
  imagemBase64: string
  nome: string
  nomeImagem: string
  unidadeMedida: 'CAIXA' | 'CX' | 'LT' | 'PC' | 'PCT' | 'UN'
  valorUnidade: string
}

export interface invoice {
  chaveAcesso: string
  dataCancelamento: string
  dataCriacao: string
  dataEnvio: string
  id: number
  protocolo: string
  protocoloCancelamento: string
  statusNotaFiscal:
    | 'CONCLUIDO'
    | 'PENDENTE'
    | 'PROCESSANDO'
    | 'ERRO'
    | 'CANCELADO'
  xml: string
  xmlCancelamento: string
}

export interface cart {
  product: product
  quantity: number
}

export interface requestProducts {
  cod?: string
  nome?: string
}

export interface responseProducts {
  produtos: [
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
  autor: consultUser
  bandeira: 'MASTERCARD' | 'VISA' | 'ELO' | 'AMERICAN_EXPRESS' | 'HIPERCARD'
  cliente: consultUser
  formadePagamento:
    | 'DINHEIRO'
    | 'CHEQUE'
    | 'CARTAO_CREDITO'
    | 'CARTAO_DEBITO'
    | 'CREDITO_LOJA'
    | 'VALE_ALIMENTACAO'
    | 'VALE_REFEICAO'
    | 'VALE_PRESENTE'
    | 'VALE_COMBUSTIVEL'
    | 'OUTROS'
  id: number
  listaProdutoResponse: Array<product>
  notaFiscal: invoice
}

export interface requestInvoice {
  budgetId: string
}

export interface responseInvoice {
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

export interface requestCreateCustomer {
  bairro: string
  cep: string
  cidade: string
  codigoIBGE: string
  cpfCnpj: string
  email: string
  endereco: string
  estado: string
  login: string
  nome: string
  numero: number
  roleGD: 'ADMIN' | 'FUNCIONARIO' | 'FORNECEDOR' | 'CLIENTE'
  telefone: string
}

export interface responseCreateCustomer {
  id: number
  cpfCnpj: string
  nome: string
  email: string
  login: string
  roleGD: 'ADMIN' | 'FUNCIONARIO' | 'FORNECEDOR' | 'CLIENTE'
  telefone: string
  cep: string
  endereco: string
  numero: number
  bairro: string
  cidade: string
  codigoIBGE: string
  estado: string
  status: string
  dataCadastro: string
  dataUltimoAcesso: undefined
  dataBloqueio: undefined
  dataExpiracaoBloqueio: undefined
  motivoBloqueio: undefined
  motivoDesativacao: { motivo: undefined; descricao: undefined }
}

export interface requestBudgetPdf {
  orcamentoId: string
}

export interface responseBudgetPdf {
  base64: string
  base64Xml: string
  base64XmlCancelamento: string
  nomeArquivo: string
}

export interface requestConsultBudget {
  budgetId: number
}

export interface responseConsultBudget extends Omit<responseRegisterBudget, 'id'> {
  id: number
}