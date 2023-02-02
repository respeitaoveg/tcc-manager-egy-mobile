import axios, { AxiosInstance } from 'axios'
import { api } from '../types/api'

export class ClientApi implements api {
  httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'baseURL'
    })
  }

  async login(login: string, password: string): Promise<any> {
    try {
      const response = await this.httpClient.post('jogo', { login, password })
    } catch (error) {
      console.error(error)
    }
  }
  async logout(): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
