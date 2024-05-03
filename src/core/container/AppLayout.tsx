import NavBar from '@/modules/menu/NavBar'

type Props = { children: React.ReactNode }

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </>
  )
}

export default AppLayout
