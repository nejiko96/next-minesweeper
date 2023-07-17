import { createSlice } from '@reduxjs/toolkit'

import { SettingsType } from '../types'

export const settingsSlice = createSlice({
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

export const {
  changeLang,
  changeTheme,
  changeLevel,
  changeWidth,
  changeHeight,
  changeMines,
} = settingsSlice.actions

export const selectSettings = (state: { settings: SettingsType }) =>
  state.settings

export default settingsSlice.reducer
