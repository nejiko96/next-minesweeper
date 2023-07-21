import { Provider } from 'react-redux'

import store from '../store'

type Props = { children: React.ReactNode }

const MsStoreProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default MsStoreProvider
