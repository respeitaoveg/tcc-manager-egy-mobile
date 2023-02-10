import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ClientApi } from '../services/ClientApi'
import { consultUser, requestConsultUser, requestRegisterUser, responseConsultUser } from '../types/api'

interface CustomerContext {
  customer: consultUser | undefined
  consultCustomer(cpf: string): Promise<consultUser | void>
  createCustomer(params: requestConsultUser): Promise<responseConsultUser | void>
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

  async function consultCustomer(cpf: string): Promise<consultUser | undefined> {
    const params: requestConsultUser = { login: cpf }

    const customer = await api.consultUser(params)

    if (customer) {
      setCustomer(customer)

      return customer
    } else {
      setCustomer(undefined)
    }
  }

  async function createCustomer(params: requestRegisterUser): Promise<responseConsultUser | void> {
    const response = await api.registerUser(params)

    if (response) {
      console.log(response)
    } else {
      setCustomer(undefined)
    }
  }

  const value = useMemo(
    () => ({
      customer,
      consultCustomer,
      createCustomer
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
