export default function(value: number) {
  return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}