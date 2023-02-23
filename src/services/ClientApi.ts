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
      console.error(error)
    }
  }

  async logout(): Promise<undefined> {
    throw new Error('Method not implemented.')
  }

  async products(params?: requestProducts): Promise<product[] | undefined> {
    try {
      const response = await this._http.post('/produto/v1/buscar', params, this.getAxiosConfig())

      return response.data.produtos
    } catch (error) {
      console.error(error)
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

      return response.data?.usuariosAtivos[0]
    } catch (error) {
      console.error(error)
    }
  }

  async registerBudget(
    params: requestRegisterBudget
  ): Promise<responseRegisterBudget | undefined> {
    try {
      const response = await this._http.post('/orcamento/v1/cadastrar', params, this.getAxiosConfig())

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async consultBudget({ budgetId }: requestConsultBudget): Promise<responseConsultBudget | undefined> {
    try {
      const response = await this._http(`/orcamento/v1/buscar/${budgetId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async invoice({ budgetId }: requestInvoice): Promise<responseInvoice | undefined> {
    try {
      const response = await this._http.get(`/orcamento/v1/enviar-nota-fiscal/${budgetId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createCustomer(params: requestCreateCustomer): Promise<responseCreateCustomer | undefined> {
    try {
      const response = await this._http.post(`/usuario/v1/cadastrar`, params, this.getAxiosConfig())

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async budgetPdf({ orcamentoId }: requestBudgetPdf): Promise<responseBudgetPdf | undefined> {
    try {
      const response = await this._http(`/orcamento/v1/gerar-pdf-base64/${orcamentoId}`, this.getAxiosConfig())

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
