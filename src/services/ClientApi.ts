import axios, { AxiosInstance } from 'axios'
import { api } from '../types/api'

export class ClientApi implements api {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://0.0.0.0:3000'
    })
  }

  async login(login: string, password: string): Promise<any> {
    try {
      const response = await this.httpClient.post('/jogo', { login, password })

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  async logout(): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
