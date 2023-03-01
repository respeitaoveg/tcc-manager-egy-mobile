export default function parseOnlyDigits(value: string) {
  return value.match(/\d+/g)?.join('')
}