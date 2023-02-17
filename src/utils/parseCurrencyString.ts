export default function(value: string): number {
  return parseFloat(value.replaceAll(',', '.'))
}