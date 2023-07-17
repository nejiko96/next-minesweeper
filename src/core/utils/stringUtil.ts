const escapeMinus: (str: string) => string = (str) => str.replace(/-/g, '\\-')

const deleteChars: (str: string, chars: string) => string = (str, chars) =>
  str.replace(new RegExp(`[${escapeMinus(chars)}]`, 'g'), '')

const selectChars: (str: string, chars: string) => string = (str, chars) =>
  str.replace(new RegExp(`[^${escapeMinus(chars)}]`, 'g'), '')

export { deleteChars, selectChars }
