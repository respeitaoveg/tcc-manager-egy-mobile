export default function parseOnlyDigits(value: string) {
  const digits = value.match(/\d+/g)?.join('') || ''

  return digits
}