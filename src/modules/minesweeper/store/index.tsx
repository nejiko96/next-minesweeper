import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import gameReducer from './gameSlice'
import settingsReducer from './settingsSlice'

const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
})

type Props = { children: React.ReactNode }

const MsStoreProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default MsStoreProvider
