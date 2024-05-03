import NavBar from '@/modules/menu/components/NavBar'

type Props = { children: React.ReactNode }

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10">
        <NavBar />
      </header>
      <main className="grow">{children}</main>
    </div>
  )
}

export default AppLayout
