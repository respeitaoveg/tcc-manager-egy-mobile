import { CircularProgress, CircularProgressLabel, HStack, Progress, Text } from "@chakra-ui/react"

interface SaleProgressProps {
  done: boolean
}

export default function SaleProgress({ done }: SaleProgressProps) {
  return (
    <CircularProgress isIndeterminate={!done} size={100} value={done ? 100 : 50} color='teal'>
      <CircularProgressLabel>{done ? '100%' : '50%'}</CircularProgressLabel>
    </CircularProgress>
  )
}