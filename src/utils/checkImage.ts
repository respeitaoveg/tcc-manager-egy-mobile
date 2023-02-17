import notFoundImage from '../assets/images/not-found-image.png'

export default function(imagemBase64: string | undefined) {
  if (imagemBase64) return `data:image/png;base64, ${imagemBase64}`

  return notFoundImage
}