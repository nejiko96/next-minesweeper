import { times } from 'lodash-es'
import SlidePuzzle from './SlidePuzzle'

/**
 * スライドパズルを自動で解くソルバー
 */
class SlidePuzzleSolver {
  /**
   * 現在の盤面
   * @type {number[][]}
   */
  #grid: number[][] = []

  /**
   * 盤面の幅(W)
   * @type {number}
   */
  #w = 0

  /**
   * 盤面の幅(H)
   * @type {number}
   */
  #h = 0

  /**
   * マス数(S=WxH)
   * @type {number}
   */
  #s = 0

  /**
   * スライドパズルのロジック
   * @type {SlidePuzzle}
   */
  #logic: SlidePuzzle = new SlidePuzzle(2)

  /**
   * 移動の履歴
   * @type {number[][]}
   */
  #path: number[][] = []

  /**
   * パネル毎の移動可／不可
   * @type {Record<number, boolean>}
   */
  #locked: Record<number, boolean> = {}

  /**
   * 指定されたパネルの現在位置を求める
   * @param {number} x パネル番号(1...S)
   * @return {[number, number]} [縦位置, 横位置]
   */
  #currentPos(x: number): [number, number] {
    let [i, j] = [-1, -1]
    i = this.#grid.findIndex((arr) => {
      j = arr.findIndex((v) => v === x)
      return j >= 0
    })
    return [i, j]
  }

  /**
   * 現在の状態から完成状態までのスライド履歴を生成する
   * @param {nuber[][]} grid 盤面
   * @return {number[][]} 移動履歴
   */
  solve(grid: number[][]): number[][] {
    // console.log('solve: ')
    this.#grid = JSON.parse(JSON.stringify(grid))
    this.#w = this.#grid[0].length
    this.#h = this.#grid.length
    this.#s = this.#w * this.#h
    this.#logic = new SlidePuzzle(this.#w, this.#h)
    this.#path = []
    this.#locked = {}
    for (let x = 1; x <= this.#s - this.#w; x++) {
      this.#solveFor(x)
      const y = x + this.#w
      if (y > this.#s - this.#w) {
        this.#solveFor(y)
      }
    }
    return this.#path
  }

  /**
   * 指定されたパネルを目的地に移動させるまでのスライド履歴を生成する
   * @param {number} x パネル番号
   */
  #solveFor(x: number): void {
    // console.log(`solveFor: ${x}`)

    // 空きマス移動のときに動かさないパネルに追加
    this.#locked[x] = true
    // 現在位置
    const [fi, fj] = this.#currentPos(x)
    // 目標位置
    const [ti, tj] = this.#logic.pos2D(x - 1)

    // すでに目標の位置にいれば何もせず終了
    if (fi === ti && fj === tj) {
      // console.log(' no move.')
      return
    }

    if (tj === this.#w - 1 && ti === this.#h - 1) {
      // 何もしない
    } else if (tj >= this.#w - 2 && ti >= this.#h - 2) {
      this.#moveSimple(fi, fj, ti, tj)
    } else if (tj === this.#w - 1) {
      this.#moveToRightEnd(fi, fj, ti, tj)
    } else if (ti === this.#h - 1) {
      this.#moveToBottomEnd(fi, fj, ti, tj)
    } else {
      this.#moveSimple(fi, fj, ti, tj)
    }
  }

  /**
   * fの位置にあるパネルをtまで移動させる
   * @param {number} fi 現在縦位置
   * @param {number} fj 現在横位置
   * @param {number} ti 目標縦位置
   * @param {number} tj 目標横位置
   */
  #moveSimple(fi: number, fj: number, ti: number, tj: number): void {
    // console.log(`moveSimple: [${fi},${fj}]->[${ti},${tj}]`)

    let [vi, vj] = [fi, fj]
    // 右に１マスずつ移動
    for (; vj < tj; vj += 1) {
      this.#moveOne(vi, vj, vi, vj + 1)
    }
    // 左に１マスずつ移動
    for (; vj > tj; vj -= 1) {
      this.#moveOne(vi, vj, vi, vj - 1)
    }
    // 下に１マスずつ移動
    for (; vi < ti; vi += 1) {
      this.#moveOne(vi, vj, vi + 1, vj)
    }
    // 上に１マスずつ移動
    for (; vi > ti; vi -= 1) {
      this.#moveOne(vi, vj, vi - 1, vj)
    }
  }

  /**
   * fの位置にあるパネルをt(右端)まで移動させる
   * @param {number} fi 現在縦位置
   * @param {number} fj 現在横位置
   * @param {number} ti 目標縦位置
   * @param {number} tj 目標横位置
   */
  #moveToRightEnd(fi: number, fj: number, ti: number, tj: number): void {
    // console.log(`moveToRightEnd: [${fi},${fj}]->[${ti},${tj}]`)

    // 真下にいて上がちょうど空いていたら
    // 今の位置からスライドさせるだけ
    if (fi === ti + 1 && fj === tj && this.#grid[ti][tj] === this.#s) {
      this.#slideAt(fi, fj)
      return
    }

    // 左隣とくっつけて目標位置に入れる
    this.#moveSimple(fi, fj, ti + 2, tj)
    this.#moveOne(ti, tj - 1, ti, tj)
    this.#moveOne(ti + 2, tj, ti + 1, tj)
    this.#moveOne(ti, tj, ti, tj - 1)
    this.#moveOne(ti + 1, tj, ti, tj)
  }

  /**
   * fの位置にあるパネルをt(下端)まで移動させる
   * @param {number} fi 現在縦位置
   * @param {number} fj 現在横位置
   * @param {number} ti 目標縦位置
   * @param {number} tj 目標横位置
   */
  #moveToBottomEnd(fi: number, fj: number, ti: number, tj: number): void {
    // console.log(`moveToBottomEnd: [${fi},${fj}]->[${ti},${tj}]`)

    // 真横にいて横がちょうど空いていたら
    // 今の位置からスライドさせるだけ
    if (fi === ti && fj === tj + 1 && this.#grid[ti][tj] === this.#s) {
      this.#slideAt(fi, fj)
      return
    }

    // 上隣とくっつけて目標位置に入れる
    this.#moveSimple(fi, fj, ti, tj + 2)
    this.#moveOne(ti - 1, tj, ti, tj)
    this.#moveOne(ti, tj + 2, ti, tj + 1)
    this.#moveOne(ti, tj, ti - 1, tj)
    this.#moveOne(ti, tj + 1, ti, tj)
  }

  /**
   * fの位置にあるパネルをt(隣)まで移動させる
   * @param {number} fi 現在縦位置
   * @param {number} fj 現在横位置
   * @param {number} ti 目標縦位置
   * @param {number} tj 目標横位置
   */
  #moveOne(fi: number, fj: number, ti: number, tj: number): void {
    // console.log(` moveOne: [${fi},${fj}]->[${ti},${tj}]`)

    this.#vacate(ti, tj)
    this.#slideAt(fi, fj)
  }

  /**
   * 目標位置のマスを空ける
   * @param {number} ti 目標縦位置
   * @param {number} tj 目標横位置
   */
  #vacate(ti: number, tj: number): void {
    // 目標位置を始点とした最短経路探索
    const q: number[][] = []
    const prev: number[][][] = times(this.#h, () => times(this.#w, () => [-2]))
    q.push([ti, tj])
    prev[ti][tj] = [-1]
    while (q.length) {
      const [i, j] = q.shift() as number[]
      SlidePuzzle.NEIGHBORS.forEach(({ di, dj }) => {
        const [i2, j2] = [i + di, j + dj]
        if (i2 < 0 || i2 >= this.#h || j2 < 0 || j2 >= this.#w) return // 盤面の外
        if (this.#locked[this.#grid[i2][j2]]) return // 動かせない
        if (prev[i2][j2][0] >= -1) return // 探索済
        q.push([i2, j2])
        prev[i2][j2] = [i, j]
      })
    }
    // 現在の空きマスの位置
    const [fi, fj] = this.#currentPos(this.#s)
    // 目標位置まで空きマスを移動させる
    let [vi, vj] = prev[fi][fj]
    while (vi >= 0) {
      this.#slideAt(vi, vj)
      ;[vi, vj] = prev[vi][vj]
    }
  }

  /**
   * 指定した位置のパネルをスライドさせて履歴を残す
   * @param {number} i 縦位置
   * @param {number} j 横位置
   */

  #slideAt(i: number, j: number): void {
    // console.log(`  slideAt: [${i}, ${j}]`)
    this.#path.push([i, j])
    this.#logic.slideAt(this.#grid, i, j)
  }
}

export default SlidePuzzleSolver
