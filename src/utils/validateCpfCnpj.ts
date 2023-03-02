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

export function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf == '') return false
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false
  // Valida 1o digito
  let add = 0
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
  let rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(9))) return false
  // Valida 2o digito
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(10))) return false

  return true
}
