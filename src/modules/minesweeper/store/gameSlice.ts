import {
  bindActionCreators,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import * as gameModel from '../models/gameModel'
import { makeWrapper } from '../models/mouseEventModel'
import {
  type GameStoreStateType,
  type GridClickType,
  type GridPosType,
  type SizeSettingType,
} from '../types'

const mouseModel = makeWrapper(gameModel)

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    ...gameModel.initAll({ level: 'easy' }),
    ...mouseModel.initState(),
    touch: false,
  } as GameStoreStateType,
  reducers: {
    changeSize: (
      state: GameStoreStateType,
      action: PayloadAction<SizeSettingType>,
    ) => {
      Object.assign(state, {
        ...gameModel.initAll(action.payload),
        ...mouseModel.initState(),
        touch: false,
      })
    },
    restart: (state: GameStoreStateType) => {
      Object.assign(state, {
        ...gameModel.initBoard(state),
        ...mouseModel.initState(),
        touch: false,
      })
    },
    mouseDown: (
      state: GameStoreStateType,
      action: PayloadAction<GridClickType>,
    ) => {
      const { button, row, col } = action.payload
      mouseModel.handleMouseDown(state, button, row, col)
    },
    mouseUp: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
      const { row, col } = action.payload
      mouseModel.handleMouseUp(state, row, col)
    },
    mouseOver: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
      const { row, col } = action.payload
      mouseModel.handleMouseOver(state, row, col)
    },
    mouseOut: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
      const { row, col } = action.payload
      mouseModel.handleMouseOut(state, row, col)
    },
    touchStart: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
      const { row, col } = action.payload
      state.touch = true
      gameModel.handleTouchStart(state, row, col)
    },
    touchEnd: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
      const { row, col } = action.payload
      state.touch = false
      gameModel.handleTouchEnd(state, row, col)
    },
    longPress: (
      state: GameStoreStateType,
      action: PayloadAction<GridPosType>,
    ) => {
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

export type GameContextType = ReturnType<typeof useGame>

export default gameSlice.reducer
