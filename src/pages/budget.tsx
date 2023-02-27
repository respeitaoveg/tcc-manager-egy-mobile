import {
  Button,
  HStack,
  useColorModeValue,
  VStack,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClientApi } from '../services/ClientApi'
import { invoice, responseBudgetPdf } from '../types/api'

export default function Budget() {
  const { id: paramBudgetId } = useParams()
  const [invoice, setInvoice] = useState<invoice>()
  const [budgetPdf, setBudgetPdf] = useState<responseBudgetPdf>()
  const api = new ClientApi()

  useEffect(() => {
    requests()
  }, [])

  async function getBudgetInvoice(id: string) {
    const response = await api.consultBudget({ budgetId: parseInt(id) })

    return response?.notaFiscal
  }

  async function getPdf(id: string) {
    const response = await api.budgetPdf({ orcamentoId: id })

    return response
  }

  async function requests() {
    if (paramBudgetId) {
      const resp = await getBudgetInvoice(paramBudgetId)

      if (resp) {
        setInvoice(resp)

        if (resp && resp.statusNotaFiscal !== 'PROCESSANDO') {
          const respPdf = await getPdf(paramBudgetId)

          setBudgetPdf(respPdf)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000))

          requests()
        }
      }

    }
  }

  return (
    <VStack
      minH={'calc(100vh - 200px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      spacing={20}
    >
      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        spacing={2}
        overflow="hidden"
        w={300}
      >
        <HStack w="full" h="15%" px={3} py={5} backgroundColor="teal">
          <Text
            w="90%"
            fontSize="xl"
            color="white"
            overflow="auto"
            whiteSpace="nowrap"
            lineHeight='normal'
          >
            Baixar {invoice?.statusNotaFiscal === 'CONCLUIDO' ? 'cupom fiscal' : 'orçamento'}
          </Text>
        </HStack>
        <VStack spacing={5} p={4} py={8}>
          {invoice?.statusNotaFiscal === 'CANCELADO' && (
            <Alert status='success'>
              <AlertIcon />
              Nota fiscal cancelada!
            </Alert>
          )}
          {invoice?.statusNotaFiscal === 'CONCLUIDO' && (
            <Alert status='success'>
              <AlertIcon />
              Cupom fiscal disponível!
            </Alert>
          )}
          {invoice?.statusNotaFiscal === 'ERRO' && (
            <Alert status='error'>
              <AlertIcon />
              Erro ao gerar o cupom fiscal!
            </Alert>
          )}
          {invoice?.statusNotaFiscal === 'PENDENTE' && (
            <Alert status='info'>
              <AlertIcon />
              Cupom fiscal pendente!
            </Alert>
          )}
          {invoice?.statusNotaFiscal === 'PROCESSANDO' && (
            <Alert status='info'>
              <AlertIcon />
              Nota fiscal sendo processada! Aguarde um pouco para baixar o cumpom fiscal!
            </Alert>
          )}
          <Button
            as="a"
            id="download"
            href={`data:application/pdf;base64,${budgetPdf?.base64}`}
            colorScheme="teal"
            download={budgetPdf?.nomeArquivo}
            disabled={invoice?.statusNotaFiscal === 'PROCESSANDO' || !budgetPdf?.base64}
            isLoading={invoice?.statusNotaFiscal === 'PROCESSANDO' || !budgetPdf?.base64}
          >
            Baixar
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
