export default function parseMainName(value: string) {
  const arr = value.split(' ')

  return `${arr[0]} ${arr[1]}`
}