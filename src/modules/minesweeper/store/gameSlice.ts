import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import * as gameModel from '../models/gameModel'
import { makeWrapper } from '../models/mouseEventModel'
import { type GameStoreStateType } from '../types'

const mouseModel = makeWrapper(gameModel)

const gameSlice = createSlice({
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

export const useGame = () => {
  const game = useSelector((state: { game: GameStoreStateType }) => state.game)
  const dispatch = useDispatch()
  const actions = bindActionCreators(gameSlice.actions, dispatch)
  return {
    game,
    ...actions,
  }
}

export default gameSlice.reducer
