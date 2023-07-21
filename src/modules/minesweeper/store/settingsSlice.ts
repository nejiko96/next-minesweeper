import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import type { SettingsType } from '../types'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    lang: 'en',
    theme: {
      name: 'green',
      size: 32,
    },
    board: {
      level: 'easy',
    },
  } as SettingsType,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload
    },
    changeTheme: (state, action) => {
      state.theme = action.payload
    },
    changeLevel: (state, action) => {
      state.board.level = action.payload
    },
    changeWidth: (state, action) => {
      state.board.width = action.payload
    },
    changeHeight: (state, action) => {
      state.board.height = action.payload
    },
    changeMines: (state, action) => {
      state.board.mines = action.payload
    },
  },
})

export const useSettings = () => {
  const settings = useSelector(
    (state: { settings: SettingsType }) => state.settings,
  )
  const dispatch = useDispatch()
  const actions = bindActionCreators(settingsSlice.actions, dispatch)
  return {
    settings,
    ...actions,
  }
}

export default settingsSlice.reducer
