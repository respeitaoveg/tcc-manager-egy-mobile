export const cpfFormat = '999.999.999-99'
export const cpfFormatHash = '###.###.###-##'
export const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
export const msgInvalidCpf = 'CPF inválido'

export const cnpjFormat = '99.999.999/9999-99'
export const cnpjFormatHash = '##.###.###/####-##'
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

export const cpfCnpjRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
export const msgInvalidCpfCnpj = 'CPF/CNPJ inválido'

export function checkCpfCnpj(value: number) {
  if (value > 0) {
    if (value === 11 || value === 14) return true

    return false
  }

  return false
}