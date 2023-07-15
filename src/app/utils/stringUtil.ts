const escapeMinus = (str: string): string => str.replace(/-/g, '\\-')

const deleteChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[${escapeMinus(chars)}]`, 'g'), '')

const selectChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[^${escapeMinus(chars)}]`, 'g'), '')

export { deleteChars, selectChars }
