import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'

interface MyInputProps {
  id: string
  type: string
  formLabel: string
  error: string | undefined
  isRequired?: boolean
  register: any
}

export default function MyInput(props: MyInputProps) {
  const { id, formLabel, error, isRequired, type, register } = props
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>{formLabel}</FormLabel>
      <Input type={type} {...register} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
