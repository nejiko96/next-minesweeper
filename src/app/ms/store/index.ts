import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './gameSlice'
import settingsReducer from './settingsSlice'

const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
})

export default store
