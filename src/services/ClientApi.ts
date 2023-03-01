import { createStandaloneToast, useToast } from '@chakra-ui/react'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  api,
  consultUser,
  product,
  requestBudgetPdf,
  requestConsultBudget,
  requestConsultUser,
  requestCreateCustomer,
  requestInvoice,
  requestProducts,
  requestRegisterBudget,
  responseBudgetPdf,
  responseConsultBudget,
  responseCreateCustomer,
  responseInvoice,
  responseRegisterBudget,
  user
} from '../types/api'

const { toast } = createStandaloneToast()

export class ClientApi implements api {
  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL
    })
  }

  private getAxiosConfig(): AxiosRequestConfig<any> {
    const aux = localStorage.getItem('auth')

    if (aux) {
      const auth = JSON.parse(aux)

      return {
        headers: {
          'x-access-token': auth.token
        }
      }
    }

    return {}
  }

  async login(login: string, password: string): Promise<user | undefined> {
    try {
      const response = await this._http.post('/usuario/v1/login', {
        login,
        senha: password
      })

      localStorage.setItem('auth', JSON.stringify(response.data))

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: error?.response?.data?.message || 'Login e senha inválidos',
        status: 'error',
        duration: 2000
      })
    }
  }

  async logout(): Promise<undefined> {
    throw new Error('Method not implemented.')
  }

  async products(params?: requestProducts): Promise<product[] | undefined> {
    try {
      const response = await this._http.post('/produto/v1/buscar', params, this.getAxiosConfig())

      const data = response.data.produtos

      if (data && data.length > 0) return data


      toast({
        title: 'Erro!',
        description: 'Produto não encontrado.',
        status: 'error',
        duration: 2000
      })

    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar produto.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async consultUser(
    params?: requestConsultUser
  ): Promise<consultUser | undefined> {
    try {
      const response = await this._http.post(
        '/usuario/v1/consultar',
        params,
        this.getAxiosConfig()
      )

      const user = response.data?.usuariosAtivos

      if (user) return user[0]

      toast({
        title: 'Erro!',
        description: 'Cliente não encontrado.',
        status: 'error',
        duration: 2000
      })
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar cliente.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async registerBudget(
    params: requestRegisterBudget
  ): Promise<responseRegisterBudget | undefined> {
    try {
      const response = await this._http.post('/orcamento/v1/cadastrar', params, this.getAxiosConfig())

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar orçamento.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async consultBudget({ budgetId }: requestConsultBudget): Promise<responseConsultBudget | undefined> {
    try {
      const response = await this._http(`/orcamento/v1/buscar/${budgetId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar a consulta do orçamento.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async invoice({ budgetId }: requestInvoice): Promise<responseInvoice | undefined> {
    try {
      const response = await this._http.get(`/orcamento/v1/enviar-nota-fiscal/${budgetId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar a nota.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async createCustomer(params: requestCreateCustomer): Promise<responseCreateCustomer | undefined> {
    try {
      const response = await this._http.post(`/usuario/v1/cadastrar`, params, this.getAxiosConfig())

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao cadastrar cliente.',
        status: 'error',
        duration: 2000
      })
    }
  }

  async budgetPdf({ orcamentoId }: requestBudgetPdf): Promise<responseBudgetPdf | undefined> {
    try {
      const response = await this._http(`/orcamento/v1/gerar-pdf-base64/${orcamentoId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao requisitar o pdf.',
        status: 'error',
        duration: 2000
      })
    }
  }
}
