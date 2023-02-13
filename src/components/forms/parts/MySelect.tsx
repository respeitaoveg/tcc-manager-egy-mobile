import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"

interface mySelectProps {
  id: string
  formLabel: string
  error: string | undefined
  isRequired: boolean
  register: any
  options: Array<string>
}

export function MySelect(props: mySelectProps) {
  const { id,formLabel, error, register, isRequired, options } = props
  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>{formLabel}</FormLabel>
      <Select {...register}>
        {options.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}