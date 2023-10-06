import { shuffle, times } from 'lodash-es'

type NeighborType = {
  di: number
  dj: number
  move: string
}

/**
 * スライドパズルのロジック
 */
class SlidePuzzle {
  /**
   * 隣接するマスの相対位置
   * @type {number[][]}
   */
  static NEIGHBORS: Readonly<NeighborType[]> = [
    { di: 1, dj: 0, move: 'down' },
    { di: 0, dj: 1, move: 'right' },
    { di: -1, dj: 0, move: 'up' },
    { di: 0, dj: -1, move: 'left' },
  ]

  /**
   * 数列の転倒数
   * @param {number[]} arr 数列
   */
  static #inversionNumber(arr: number[]): number {
    let ret = 0 // 転倒数
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) ret += 1
      }
    }
    return ret
  }

  /**
   * 盤面の幅(W)
   * @type {number}
   */
  w: number

  /**
   * 盤面の幅(H)
   * @type {number}
   */
  h: number

  /**
   * マス数(S=WxH)
   * @type {number}
   */
  s: number

  /**
   * パネルの配列
   * @type {number[] | null}
   */
  #panels: number[]

  /**
   * 完了状態の文字列
   * @type {string | null}
   */
  #completeStatus: string

  /**
   * コンストラクタ
   * @param {number} n 盤面のサイズ
   */
  constructor(n: number)
  /**
   * コンストラクタ
   * @param {number} w 盤面の幅
   * @param {number} h 盤面の高さ
   */
  constructor(w: number, h: number)
  constructor(w: number, h?: number) {
    this.w = Math.max(w, 2)

    if (h === undefined) {
      this.h = this.w
    } else {
      this.h = Math.max(h, 2)
    }

    this.s = this.w * this.h
    this.#panels = times(this.s, (k) => k + 1)
    this.#completeStatus = JSON.stringify(this.#arrToGrid(this.#panels))
  }

  /**
   * 位置番号を１次元から２次元に変換
   * @param {number} k 位置番号
   * @return {[number, number]} 変換結果
   */
  pos2D(k: number): [number, number] {
    return [(k / this.w) | 0, k % this.w]
  }

  /**
   * 空きマスの移動距離
   * @param {number[]} パネルの配列
   */
  #movesOfEmptyCell(arr: number[]): number {
    const k = arr.findIndex((x) => x === this.s)
    const [i, j] = this.pos2D(this.s - 1 - k)
    return i + j
  }

  /**
   * 最初の２つを交換
   * @param {number[]} パネルの配列
   */
  #swapTop2(arr: number[]): void {
    const [i, j] = [0, 1, 2].filter((k) => arr[k] !== this.s)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  /**
   * 配列をグリッドに変換
   * @param {number[]} パネルの配列
   */
  #arrToGrid(arr: number[]): number[][] {
    return times(this.h, (i) => arr.slice(i * this.w, (i + 1) * this.w))
  }

  /**
   * グリッド生成
   * @return {number[][]} グリッド
   */
  generateGrid(): number[][] {
    const arr = shuffle(this.#panels)
    // console.log(JSON.stringify(arr))

    const invNum = SlidePuzzle.#inversionNumber(arr)
    const moves = this.#movesOfEmptyCell(arr)
    // console.log([invNum, moves])

    if ((invNum + moves) % 2 > 0) this.#swapTop2(arr)
    // console.log(JSON.stringify(arr))

    return this.#arrToGrid(arr)
  }

  /**
   * スライド
   * @param {number[][]} grid グリッド
   * @param {number} i 縦位置
   * @param {number} j 横位置
   * @return {string} スライド方向
   */
  slideAt = (grid: number[][], i: number, j: number): string => {
    const nb = SlidePuzzle.NEIGHBORS.map(({ di, dj, move }) => ({
      i2: i + di,
      j2: j + dj,
      move,
    })).find(({ i2, j2 }) => grid[i2] && grid[i2][j2] === this.s)
    if (!nb) return ''
    const { i2, j2, move } = nb
    ;[grid[i][j], grid[i2][j2]] = [grid[i2][j2], grid[i][j]]
    return move
  }

  /**
   * 完成判定
   * @param {number[][]} grid グリッド
   * @param {boolean} true:完成、false:未完成
   */
  isComplete(grid: number[][]): boolean {
    return JSON.stringify(grid) === this.#completeStatus
  }
}

export default SlidePuzzle
