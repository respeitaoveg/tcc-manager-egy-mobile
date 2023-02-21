import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ClientApi } from '../services/ClientApi'

const pdf = {
  'nomeArquivo': 'topdf4477167790285615766.pdf',
  'base64':
    'JVBERi0xLjQKJeLjz9MKNCAwIG9iaiA8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDc2MD4+c3RyZWFtCnicnZZLU9pAHMDv+RT/Qw86U5Z9JruciojWzoCI2MfUHlYSNU6SbUOw04/b8cD00GPv3SSgCVaS6XAgy+b3fz/45hzMHAxCCUQlzHxnOHPOnG8ORph5Ar47FN7Z+zuHYBg5n79g8J9ejx3JCZJyc44255Lm9gdce35879b54CT5pf2kN7kN3SMCnCFMYHbtkOKCAHGRUiAEQYrBLHb2TtOVjoMkM/uzu9zUNUgJ4qoKUgKCeIiX1BiBxHWCECRqqiRRiAvgUqES+rRMwypDnzMexchTwD2KFCmgHxZCsZmj9OrNTazDCM1N3CRFuMiGmtsv4RZSLvc4udwHJaVHOx7z3C3bMRI1AXmQOFW5lBwf3Or7APwA+vNgsTC9NjS2bquCPtSZhmEcLhYPpge7WeIKhL0qDedhttSrBwO+gcds1eXQZ3IkQ7RmBMVdTLsUU2ZT2eN8N04VRUxU+UmQ+FZx0MJ1ZmG5cd03i9zwQRS2pT2JeJn7sYmDpoC5NHe0AsEsiIJrkwRNIbK94ZIq+Y/63M4O4UiyKvM/hcVchhQv8KENahqsGtO59vIJnC41nEa/46+hgXOTZQZGOjSpfb5Kw+TWQAcG1p0svNLdyTQ/DSc927OS4o4g2637rAjzqcFsX3myTGOwmKehrcHdHOUSMbcKvteRNeoiCTOdhg00V94WfbbUSRb62m+qG2uwWyNnJtNRQy4LJ6nCeWQLZjoc92E4OjidTvuDt/3DPmA2go+txNiKIGVmiDsaQedg2h+dNKDrcFHJES2rafoKyGuBG+q2jFMFI3Ax3s2sI7Rb1UuFQIXazP0irnAcpPXovpiSCtpKYdEflBRxKbbTMkv1Ak6Sa5PGevUnWDT4WfAYIyLXe6qPWmgkrtxsiscJC/c/o9BOLp39aupOYrelXcIVKXbUYlZM2zbahd3opb3HOs1LXrfR6glESBWmbDPi2yhldmuWhX+UxzbfbhN90267FA7zqoxDO3SCMN20eP6H58z5C+x9CrQKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqPDwvQ29udGVudHMgNCAwIFIvVHlwZS9QYWdlL1Jlc291cmNlczw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldL0ZvbnQ8PC9GMSAyIDAgUi9GMiAzIDAgUj4+Pj4vUGFyZW50IDUgMCBSL01lZGlhQm94WzAgMCA4NDEuODggNTk1LjI4XT4+CmVuZG9iagoyIDAgb2JqPDwvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGQvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjMgMCBvYmo8PC9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjUgMCBvYmo8PC9LaWRzWzEgMCBSXS9UeXBlL1BhZ2VzL0NvdW50IDE+PgplbmRvYmoKNiAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA1IDAgUj4+CmVuZG9iago3IDAgb2JqPDwvTW9kRGF0ZShEOjIwMjMwMjIwMjE0NDA1LTAzJzAwJykvQ3JlYXRpb25EYXRlKEQ6MjAyMzAyMjAyMTQ0MDUtMDMnMDAnKS9Qcm9kdWNlcihpVGV4dCAyLjAuOCBcKGJ5IGxvd2FnaWUuY29tXCkpPj4KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDg0MiAwMDAwMCBuIAowMDAwMDAxMDEzIDAwMDAwIG4gCjAwMDAwMDExMDUgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAxMTkyIDAwMDAwIG4gCjAwMDAwMDEyNDIgMDAwMDAgbiAKMDAwMDAwMTI4NiAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gNyAwIFIvSUQgWzw2YjIyNWVjMGU0OTUyYjU2NjlhOTVjNGZmOWM5YTkyYz48YzAyNDhkNGQwMzU0YmU0MDFhNzA5ZWE0MzhiZDAyMjA+XS9Sb290IDYgMCBSL1NpemUgOD4+CnN0YXJ0eHJlZgoxNDE3CiUlRU9GCg==',
  'base64Xml': null,
  'base64XmlCancelamento': null
}

export default function Sale() {
  const [budget, setBudget] = useState()
  const [budgetPdf, setBudgetPdf] = useState(pdf)
  const api = new ClientApi()

  // api.consultBudget({ budgetId: 80 })
  // api.budgetPdf({ orcamentoId: '80' })

  return (
    <Flex
      minH={'calc(100vh - 200px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      {budgetPdf ? (
        <Button
          as="a"
          id="download"
          href={`data:application/pdf;base64,${budgetPdf.base64}`}
          colorScheme="teal"
          download={budgetPdf.nomeArquivo}
        >
          Baixar orçamento
        </Button>
      ) : (
        <CircularProgress isIndeterminate color="teal" size={20}>
          <CircularProgressLabel fontSize={12}>40%</CircularProgressLabel>
        </CircularProgress>
      )}
    </Flex>
  )
}
