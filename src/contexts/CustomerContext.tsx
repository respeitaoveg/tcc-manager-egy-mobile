import { createStandaloneToast } from '@chakra-ui/react'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ClientApi } from '../services/ClientApi'
import { consultUser, requestConsultUser, requestCreateCustomer, responseCreateCustomer } from '../types/api'

const { toast } = createStandaloneToast()

interface CustomerContext {
  customer: consultUser | undefined
  consultCustomer(cpf: string): void
  createCustomer(params: requestConsultUser): Promise<responseCreateCustomer | void>
  removeCustomer(): void
}

export const CustomerContext = createContext<CustomerContext>(
  {} as CustomerContext
)

export default function CustomerProvider({
  children
}: {
  children: ReactNode
}) {
  const [customer, setCustomer] = useState<consultUser | undefined>()

  const api = new ClientApi()

  async function consultCustomer(cpf: string) {
    const params: requestConsultUser = { login: cpf }

    const response = await api.consultUser(params)

    if (!customer && response) {
      setCustomer(response)

      toast({
        title: 'Encontrado!',
        description: 'Cliente encontrado com sucesso.',
        status: 'success',
        duration: 2000
      })
    }
  }

  async function createCustomer(params: requestCreateCustomer): Promise<responseCreateCustomer | void> {
    const response = await api.createCustomer(params)

    if (response) {
      setCustomer({
        cpfCnpj: response.cpfCnpj,
        id: response.id,
        nome: response.nome,
        roleGNFE: response.roleGD
      })

      return response
    }
  }

  function removeCustomer() {
    setCustomer(undefined)

    toast({
      title: 'Removido!',
      description: 'Cliente removido com sucesso.',
      status: 'success',
      duration: 2000
    })
  }

  const value = useMemo(
    () => ({
      customer,
      consultCustomer,
      createCustomer,
      removeCustomer
    }),
    [customer]
  )

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => useContext(CustomerContext)
