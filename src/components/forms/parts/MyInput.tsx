import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'
import ReactInputMask from 'react-input-mask'

interface MyInputProps {
  id: string
  type: string
  formLabel: string
  error: string | undefined
  isRequired?: boolean
  register: any
  mask?: string
}

export default function MyInput(props: MyInputProps) {
  const { id, formLabel, error, isRequired, type, register, mask } = props
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>{formLabel}</FormLabel>
      {mask ? (
        <Input as={ReactInputMask} id={id} mask={mask} maskChar={null} type={type} {...register} />
      ) : (
        <Input id={id} type={type} {...register} />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
