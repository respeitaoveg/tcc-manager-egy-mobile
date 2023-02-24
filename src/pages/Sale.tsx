import {
  Button,
  HStack,
  useColorModeValue,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Skeleton
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SaleProgress from '../components/SaleProgress'
import { ClientApi } from '../services/ClientApi'
import { invoice, responseBudgetPdf } from '../types/api'

export default function Sale() {
  const location = useLocation()
  const { id: paramBudgetId } = useParams()
  const [invoice, setInvoice] = useState<invoice>()
  const [budgetPdf, setBudgetPdf] = useState<responseBudgetPdf>()
  const [hasInvoice, setHasInvoice] = useState(false)
  const api = new ClientApi()

  useEffect(() => {
    requests()
  }, [])

  async function requests() {
    if (!location.pathname.includes('sale')) return

    if (paramBudgetId) {
      const budgetResponse = await api.consultBudget({ budgetId: parseInt(paramBudgetId) })
      const pdfResponse = await api.budgetPdf({ orcamentoId: paramBudgetId.toString() })

      if (budgetResponse?.id) {
        setInvoice(budgetResponse.notaFiscal)

        if (invoice?.statusNotaFiscal === 'CONCLUIDO') setHasInvoice(true)

        if (pdfResponse) setBudgetPdf(pdfResponse)

        if (invoice?.statusNotaFiscal === 'PENDENTE')
          return  setTimeout(() => {
            requests()
          }, 5000)
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
            Baixar orçamento
          </Text>
        </HStack>
        {hasInvoice ? (
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
                Cupom fiscal está pendente!
              </Alert>
            )}
            {invoice?.statusNotaFiscal === 'PROCESSANDO' && (
              <>
                <SaleProgress done={hasInvoice} />
                <Alert status='info'>
                  <AlertIcon />
                  Nota fiscal sendo processada! Aguarde um pouco para baixar o cumpom fiscal!
                </Alert>
              </>
            )}
            <Button
              as="a"
              id="download"
              href={`data:application/pdf;base64,${budgetPdf?.base64}`}
              colorScheme="teal"
              download={budgetPdf?.nomeArquivo}
            >
              Baixar
            </Button>
          </VStack>
        ) : (
          <VStack w={'full'} p={4} py={8}>
            <Skeleton w='full' height='20px' />
            <Skeleton w='full' height='20px' />
            <Skeleton w='full' height='20px' />
          </VStack>
        )}

      </VStack>
    </VStack>
  )
}
