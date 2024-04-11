import {
  bindActionCreators,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import {
  type LevelType,
  type SettingsType,
  type ThemeSettingType,
} from '../types'

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
    changeLang: (state: SettingsType, action: PayloadAction<string>) => {
      state.lang = action.payload
    },
    changeTheme: (
      state: SettingsType,
      action: PayloadAction<ThemeSettingType>,
    ) => {
      state.theme = action.payload
    },
    changeLevel: (state: SettingsType, action: PayloadAction<LevelType>) => {
      state.board.level = action.payload
    },
    changeWidth: (
      state: SettingsType,
      action: PayloadAction<number | undefined>,
    ) => {
      state.board.width = action.payload
    },
    changeHeight: (
      state: SettingsType,
      action: PayloadAction<number | undefined>,
    ) => {
      state.board.height = action.payload
    },
    changeMines: (
      state: SettingsType,
      action: PayloadAction<number | undefined>,
    ) => {
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

export type SettingsContextType = ReturnType<typeof useSettings>

export default settingsSlice.reducer
