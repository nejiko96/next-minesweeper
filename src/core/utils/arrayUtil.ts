type RepeatedPermutation = {
  (str: string, len: number): string[]
  <T>(arr: ReadonlyArray<T>, len: number): T[][]
}
const repeatedPermutation: RepeatedPermutation = <T>(
  obj: string | ReadonlyArray<T>,
  len: number,
): any => {
  if (typeof obj === 'string') {
    return repeatedPermutation([...obj], len).map((arr) => arr.join(''))
  }
  const arr = obj
  if (len === 0) {
    return [[]]
  }
  return arr.flatMap((elem) =>
    repeatedPermutation(arr, len - 1).map((rp) => [elem, ...rp]),
  )
}

export { repeatedPermutation }
