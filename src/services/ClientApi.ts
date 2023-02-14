import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  api,
  consultUser,
  product,
  requestConsultUser,
  requestInvoice,
  requestProducts,
  requestRegisterBudget,
  requestRegisterUser,
  responseInvoice,
  responseRegisterBudget,
  responseRegisterUser,
  user
} from '../types/api'

const products = [
  {
    cod: '1',
    descricao: 'desc teste',
    estoqueAtual: '10',
    id: '33',
    imagemBase64:
      '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',
    nome: 'Espátula',
    nomeImagem: 'espatula',
    unidadeMedida: '??',
    valorUnidade: '1232'
  },
  {
    cod: '2',
    descricao: 'desc vacumm',
    estoqueAtual: '4',
    id: '23',
    imagemBase64:
      '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQDxIREhIQEBAQEA8SEg8VFREQFREWFhUYGhMYHSggGCYlGxMVITMhJSkrLjouFyAzODMtNygxLisBCgoKDQ0OFRAQFS0dFx0rLS0rKy0tLS0tLSs3Kzc3LSstLS0tKy03KzcrNysrNysrKysrNzcrKysrKysrKysrK//AABEIAO0A1QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIEAwUGB//EADMQAAIBAgQDBQcEAwEAAAAAAAABAhEhAwQSMUFRYQUTIjJxQlKBkcHR8GKhseEjovGC/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABkRAQEBAQEBAAAAAAAAAAAAAAABEQJBIf/aAAwDAQACEQMRAD8A/cQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArOaSbboldsCwMuWz+HiUUZKrrRPd05czUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2BEmkquyW7Plu1+1VivQpqGHVLU/bk9i3bvaymnGLawovxSV3N02S47WXE54WWwpRwsRVelaoNqlVJcYv1XyOnPOfaxapidmYfeRxHWsI0jFN0UveTXE9fs3tJprDxXWtoYvN8Iy5Pk+Prvhm6nOUU007p7ovXOpLj6oHj5PtWMI6cVu1oy3bXX7g5N69gABQAAAAAAAAAAAAAAAAAAAAAAAA+d7Z7Sc9WHhV0RVcSSTdVyVNzt2p2g5y7nCdnac6/NJmDszX4tWGoRXhjWutv2q8Gm1w/c6c8+sdXxOShhzwU9PhlSSTepOjtJPrZnabqdJMo0bZc2FFtpJVbslzLNcEqtuiS3bPZ7PyXdqsrze75LkjPVxZNRkshGEfElKT8zar8FUG0HJ0AAAAAAAAAAAAAAAAAAAAAAAADx+1c+3XCwrv25LguNC/anaFP8eG1qfmlW0Vxuea8g6w8TjFUlPS2pOadVdcHdU5eprnlm1XK5XEhiO9MNKtPC+8bXHimmq/Hia5upeTqVodGXNorK38JLdvgi83Tc9Hs/J6fHNeL2Y+4vv8A89ZesJNT2fktHin53/quX9m4A5OgAAAAAAAAAAAAAAAAAAAAAAAAeb2nn9Pgh5nvLhFepbtHPafBC83/AKnm5TDw8SEq1kpKkm6UfGzNcxm1zw8pDFw7Sr46uSqm6WaafxXxqa6JJRVkkkl0WxaMFFKKskRQ6MqkSdLlm6Xey4mvI5SrU5rrCL4dX16cPXaW4SaZHJ+3NX9mL9nr6noAHJ0AAAAAAAAAAAAAAAAAAAAAAAADD2hndHhjebsulS2fzmhaY3m9ly6s8uOBiaoyTXiaeJKSrat406p79PnZNZtc8m33souNdPnm3RptV24p/wB8DaoqNopJVcnS126t/NnSUilDrIygrIsdcpl9dJS8m8V7z5+n8/ytwhk8tqpOWyvCPP8AU/ovj6ekAcrdbkAARQAAAAAAAAAAAAAAAAAAAAAMuezaw1a8n5Y/Utnc0sNc5Pyx5nl4WF3mtymnJpVcWtWG3dW4OlCyalquJk5zi2puE27z4qPR/m1DZwSrWiSbtfqRg4ahFQjsl+W4ehJ0kZUBLROBg947+RO/6ny9C24GWy/eXfk4L339v59N/TISJOVutSAAIoAAAAAAAAAAAAAAAAAAAAAHDN5lYcavfgubLZnHUI6n8FzPHniSeJFzjKUptUUbaIX8VXZ0tVdfg7Ilpl8VTxfG28SjdKOiS4V2TVvmasLAhCuhJV3fF8r9Dq4pNtJVdKul3TYg3IyqGSIQc3RWS80vogIwsLvHTaKtJ8+i+r/F6EUkklZKyXJEQikkkqJWSLGLdakwABFAAAAAAAAAAAAAAAAAAAAAA5ZjHjCOqX/XyLY2KoJyk6JHk4ixMVuW1F/jjLb4lkS1zxZYs/8AIkpOtFF3UPVVX467G9WSW1lZcCmXUoxSnLU73pwrZdaKiqXNyMhBJCTk9Mfi/dX3LREYub0q1PNLl0XU3YcFFJJUS4EYWGoqi2Rc5261IAAigAAAAAAAAAAAAAAAAAAAAAUxcRRTlJ0SJnNRTbsluzyp4jx5coq8Yv2r7lkS1XvO+mtVNKuoVVdO1WuKrY0ZfCcFRycrt1ZWOVhGbml4mkt3Rei4HU3IgQCLt6Y7v5Jc2UTRt6Y78Xwiuf8ARswsNRVF/bfNkYOEoqi9W+LfM6HO3VkAARQAAAAAAAAAAAAAAAAAAAAAIlJJNuyW7DdLvgePnMy8SulNwjei3nf8/LFkS1GazaxJQUnpw5S0wVaa5Ub+hpjl4KWtLxadOr9PpsIwjReFbppNKzL1NyMgBDbsldvZfUoXbSV2/wBlzZrwcJRXNvd82RgYKiube75nU5261IAAigAAAAAAAAAAAAAAAAAAAAAGweVm8y8VvDw34V5pc+hZEtRmMd40tEa92nSUubLZJy0LXHQ1Vaap2rzRGWwpQcqtaLaEk6q16nVs3IykAiT+LdkubKDeyV29lzNeBg6d7t7sjL4Om7vJ7vl0R2MW61IAAyoAAAAAAAAAAAAAAAAAAAAAAHm9o53zQg9k9cl7K5FkFc/mtT7uDoq0nL6FIZVKUJamtEZR0raVWrv5ERy2HKKqqqqmq+8uPQ7ORuRlZsggN0KJb+yXNmrL4FLy8z/ZckRlsCnil5uC91GgxasgADKgAAAAAAAAAAAAAAAAAAAAAAAMGdzl+7g/E95e6Z8tBUdY0abV6XR1xMtKGI3GndyVZc1Mhs3ELKiVkrJLggQG6XZpByoasrge1LfgvdX3K5XL7Sl/5jy6vqbDHVWQABlQAAAAAAAAAAAAAAAAAAAAAAAAAARJVszDj4Li+nM3kNVsyyjy2+ZoyuXrSUvWMX/L+34uiyi1Vd0rqPU0ltTAAGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z',
    nome: 'Régua',
    nomeImagem: 'regua',
    unidadeMedida: '??',
    valorUnidade: '3264'
  }
]

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

      console.log(response.data.produtos)

      products.push(response.data.produtos[0])

      return products
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

  async registerUser(
    params: requestRegisterUser
  ): Promise<responseRegisterUser | undefined> {
    try {
      const response = await this._http.post('/usuario/v1/registrar', params)

      return response.data
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

  async invoice({ budgetId }: requestInvoice): Promise<responseInvoice | undefined> {
    try {
      // const response = await this._http.get(`/orcamento/v1/enviar-nota-fiscal/${budgetId}`, this.getAxiosConfig())

      return true as any

      // return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
