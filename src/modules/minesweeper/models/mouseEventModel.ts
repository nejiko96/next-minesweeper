import { noop } from '@/core/utils'
import type { MouseStateType } from '../types'

type TgtHandlerType<S, P extends unknown[]> = (state: S, ...args: P) => void

type TgtModelType<S, P extends unknown[]> = {
  handleLeftMouseDown: TgtHandlerType<S, P>
  handleLeftMouseUp: TgtHandlerType<S, P>
  handleLeftMouseOver: TgtHandlerType<S, P>
  handleLeftMouseOut: TgtHandlerType<S, P>
  handleRightMouseDown: TgtHandlerType<S, P>
  handleRightMouseUp: TgtHandlerType<S, P>
  handleRightMouseOver: TgtHandlerType<S, P>
  handleRightMouseOut: TgtHandlerType<S, P>
  handleBothMouseDown: TgtHandlerType<S, P>
  handleBothMouseUp: TgtHandlerType<S, P>
  handleBothMouseOver: TgtHandlerType<S, P>
  handleBothMouseOut: TgtHandlerType<S, P>
}

// mouse events
const EventEnum = {
  MOUSE_DOWN: 0,
  MOUSE_UP: 1,
  MOUSE_OVER: 2,
  MOUSE_OUT: 3,
} as const

// ev.button values
const EvBtnEnum = {
  LEFT: 0,
  RIGHT: 2,
} as const

// state.pressed values
const PressedEnum = {
  LEFT: 1,
  RIGHT: 2,
} as const

// ev.button -> state.pressed value
const pressedTbl: Readonly<Record<number, number>> = {
  [EvBtnEnum.LEFT]: PressedEnum.LEFT,
  [EvBtnEnum.RIGHT]: PressedEnum.RIGHT,
}

const makeDispatch: <S, P extends unknown[]>(
  model: TgtModelType<S, P>,
) => TgtHandlerType<S, P>[][] = (model) => [
  [
    noop,
    model.handleLeftMouseDown,
    model.handleRightMouseDown,
    model.handleBothMouseDown,
  ],
  [
    noop,
    model.handleLeftMouseUp,
    model.handleRightMouseUp,
    model.handleBothMouseUp,
  ],
  [
    noop,
    model.handleLeftMouseOver,
    model.handleRightMouseOver,
    model.handleBothMouseOver,
  ],
  [
    noop,
    model.handleLeftMouseOut,
    model.handleRightMouseOut,
    model.handleBothMouseOut,
  ],
]

const makeWrapper = <S, P extends unknown[]>(model: TgtModelType<S, P>) => ({
  dispatch: makeDispatch(model),
  initState(): MouseStateType {
    return { pressed: 0 }
  },
  handleMouseDown(state: MouseStateType & S, button: number, ...args: P): void {
    state.pressed |= pressedTbl[button]
    this.dispatch[EventEnum.MOUSE_DOWN][state.pressed](state, ...args)
  },
  handleMouseUp(state: MouseStateType & S, ...args: P): void {
    if (state.pressed === 0) return
    const pressedOld = state.pressed
    state.pressed = 0
    this.dispatch[EventEnum.MOUSE_UP][pressedOld](state, ...args)
  },
  handleMouseOver(state: Readonly<MouseStateType> & S, ...args: P): void {
    if (state.pressed === 0) return
    this.dispatch[EventEnum.MOUSE_OVER][state.pressed](state, ...args)
  },
  handleMouseOut(state: Readonly<MouseStateType> & S, ...args: P): void {
    if (state.pressed === 0) return
    this.dispatch[EventEnum.MOUSE_OUT][state.pressed](state, ...args)
  },
})

export { makeWrapper }
