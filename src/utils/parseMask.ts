// ** Third Party Imports
import StringMask from 'string-mask'

export const parseMask = (
  text: string | number,
  mask: string | string[]
): string | number => {
  const masker = new StringMask(mask, {
    usedefaults: true
  })

  return masker.apply(`${text}`)
}
