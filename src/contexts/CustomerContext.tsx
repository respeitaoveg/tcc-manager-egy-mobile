import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ClientApi } from '../services/ClientApi'
import { consultUser, requestConsultUser } from '../types/api'

interface CustomerContext {
  customer: consultUser | undefined
  consultCustomer(cpf: string): Promise<consultUser | void>
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

  async function consultCustomer(cpf: string): Promise< consultUser | void> {
    const params: requestConsultUser = { login: cpf }

    const customer = await api.consultUser(params)

    if (customer) {
      setCustomer(customer)

      return customer
    } else {
      setCustomer(undefined)
    }
  }

  const value = useMemo(
    () => ({
      customer,
      consultCustomer
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
