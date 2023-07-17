type Sample = {
  <T>(arr: T[]): T
  <T>(arr: T[], n: number): T[]
}
const sample: Sample = <T>(arr: T[], n?: number): any => {
  if (n === undefined) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  const m = Math.min(Math.max(n, 0), arr.length)
  const ret = [...arr]
  for (let i = ret.length - 1; i >= ret.length - m; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ret[i], ret[j]] = [ret[j], ret[i]]
  }
  return ret.slice(ret.length - m)
}

const shuffle: <T>(arr: T[]) => T[] = (arr) => {
  const ret = [...arr]
  for (let i = ret.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ret[i], ret[j]] = [ret[j], ret[i]]
  }
  return ret
}

type Uniq = {
  (str: string): string
  <T>(arr: T[]): T[]
}
const uniq: Uniq = <T>(obj: string | T[]): any => {
  if (typeof obj === 'string') {
    return uniq([...obj]).join('')
  }
  return [...new Set(obj)]
}

type Permutation = {
  (str: string): string[]
  <T>(arr: T[]): T[][]
}
const permutation: Permutation = <T>(obj: string | T[]): any => {
  if (typeof obj === 'string') {
    return permutation([...obj]).map((arr) => arr.join(''))
  }
  const arr = obj
  if (arr.length === 1) {
    return [arr]
  }
  return arr.flatMap((_, i) => {
    const rest = [...arr]
    const elem = rest.splice(i, 1)[0]
    return permutation(rest).map((perm) => [elem, ...perm])
  })
}

type RepeatedPermutation = {
  (str: string, len: number): string[]
  <T>(arr: T[], len: number): T[][]
}
const repeatedPermutation: RepeatedPermutation = <T>(
  obj: string | T[],
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

const fillArray: <T>(n: number, fn: (i: number) => T) => T[] = (n, fn) =>
  Array.from({ length: n }, (_, i) => fn(i))

const fillArray2D: <T>(
  w: number,
  h: number,
  fn: (i: number, j: number) => T,
) => T[][] = (w, h, fn) =>
  Array.from({ length: h }, (_, i) =>
    Array.from({ length: w }, (__, j) => fn(i, j)),
  )

export {
  sample,
  shuffle,
  uniq,
  permutation,
  repeatedPermutation,
  fillArray,
  fillArray2D,
}
