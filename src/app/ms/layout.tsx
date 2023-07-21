'use client'

import MsStoreProvider from '@/modules/minesweeper/container/MsStoreProvider'

type Props = { children: React.ReactNode }

const MsLayout: React.FC<Props> = ({ children }) => {
  return <MsStoreProvider>{children}</MsStoreProvider>
}

export default MsLayout
