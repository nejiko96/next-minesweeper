import { createSlice } from '@reduxjs/toolkit'

import * as gameModel from '../models/gameModel'
import { makeWrapper } from '../models/mouseEventModel'
import { GameStoreStateType } from '../types'

const mouseModel = makeWrapper(gameModel)

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    ...gameModel.initAll({ level: 'easy' }),
    ...mouseModel.initState(),
    touch: false,
  } as GameStoreStateType,
  reducers: {
    changeSize: (state, action) => {
      Object.assign(state, {
        ...gameModel.initAll(action.payload),
        ...mouseModel.initState(),
        touch: false,
      })
    },
    restart: (state) => {
      Object.assign(state, {
        ...gameModel.initBoard(state),
        ...mouseModel.initState(),
        touch: false,
      })
    },
    mouseDown: (state, action) => {
      const { button, row, col } = action.payload
      mouseModel.handleMouseDown(state, button, row, col)
    },
    mouseUp: (state, action) => {
      const { row, col } = action.payload
      mouseModel.handleMouseUp(state, row, col)
    },
    mouseOver: (state, action) => {
      const { row, col } = action.payload
      mouseModel.handleMouseOver(state, row, col)
    },
    mouseOut: (state, action) => {
      const { row, col } = action.payload
      mouseModel.handleMouseOut(state, row, col)
    },
    touchStart: (state, action) => {
      const { row, col } = action.payload
      state.touch = true
      gameModel.handleTouchStart(state, row, col)
    },
    touchEnd: (state, action) => {
      const { row, col } = action.payload
      state.touch = false
      gameModel.handleTouchEnd(state, row, col)
    },
    longPress: (state, action) => {
      const { row, col } = action.payload
      state.touch = false
      gameModel.handleLongPress(state, row, col)
    },
  },
})

export const {
  changeSize,
  restart,
  mouseDown,
  mouseUp,
  mouseOver,
  mouseOut,
  touchStart,
  touchEnd,
  longPress,
} = gameSlice.actions

export const selectGame = (state: { game: GameStoreStateType }) => state.game

export default gameSlice.reducer
