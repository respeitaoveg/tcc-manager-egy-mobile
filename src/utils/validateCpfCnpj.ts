export const cpfFormat = '999.999.999-99'
export const cpfFormatHash = '###.###.###-##'
export const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
export const msgInvalidCpf = 'CPF inválido'

export const cnpjFormat = '99.999.999/9999-99'
export const cnpjFormatHash = '##.###.###/####-##'
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

export const cpfCnpjRegex =
  /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
export const msgInvalidCpfCnpj = 'CPF/CNPJ inválido'

export function checkCpfCnpj(value: number) {
  if (value > 0) {
    if (value === 11 || value === 14) return true

    return false
  }

  return false
}

export function dynamicMaskCpfCnpj(digits: string) {
  if (digits) {
    if (digits.length < 12) return cpfFormat + '9'
    if (digits.length > 11) return cnpjFormat
  }

  return ''
}

// export function checkNumsCpf(strCPF: string) {
//   let Soma
//   let Resto
//   Soma = 0
//   if (strCPF == '00000000000') return false

//   for (let i = 1; i <= 9; i++)
//     Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
//   Resto = (Soma * 10) % 11

//   if (Resto == 10 || Resto == 11) Resto = 0
//   if (Resto != parseInt(strCPF.substring(9, 10))) return false

//   Soma = 0
//   for (let i = 1; i <= 10; i++)
//     Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
//   Resto = (Soma * 10) % 11

//   if (Resto == 10 || Resto == 11) Resto = 0
//   if (Resto != parseInt(strCPF.substring(10, 11))) return false

//   return true
// }
