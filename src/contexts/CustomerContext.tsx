import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ClientApi } from "../services/ClientApi"
import { completeUser } from "../types/api"

interface CustomerContext {
  customer: completeUser | undefined
  consultCustomer(cpf: string): void
}

export const CustomerContext = createContext<CustomerContext>({} as CustomerContext)

export default function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<completeUser>()

  const api = new ClientApi()

  async function consultCustomer(cpf: string) {
    const customer = await api.consultUser(cpf)

    if (customer) setCustomer(customer)
  }

  const value = useMemo(
    () => ({
      customer,
      consultCustomer
    }),
    [customer]
  )

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export const useCart = () => useContext(CustomerContext)