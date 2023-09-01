'use client'

import MsStoreProvider from '@/modules/minesweeper/container/MsStoreProvider'
import MsView from '@/modules/minesweeper/views/MsView'

const MsPage: React.FC = () => {
  return (
    <MsStoreProvider>
      <MsView />
    </MsStoreProvider>
  )
}

export default MsPage
