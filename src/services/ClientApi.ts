import axios, { AxiosInstance } from 'axios'
import { api, product, user } from '../types/api'

export class ClientApi implements api {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL
    })
  }

  async login(login: string, password: string): Promise<user | undefined> {
    try {
      const response = await this.httpClient.post('/usuario/v1/login', { login, senha: password })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async logout(): Promise<undefined> {
    throw new Error('Method not implemented.')
  }

  async products(params: any): Promise<product[] | undefined> {
    try {
      const response = await this.httpClient.post('/produto/v1/buscar', params)

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
