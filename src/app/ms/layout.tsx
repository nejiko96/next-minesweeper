'use client'

import store from '@/modules/minesweeper/store'
import { Provider } from 'react-redux'

type Props = { children: React.ReactNode }

const MsLayout: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default MsLayout
