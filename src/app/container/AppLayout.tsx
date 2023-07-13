import AppMenu from '@/app/components/AppMenu'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <nav className="bg-teal-500 text-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-2 py-4">
            <h1>
              <span className="mr-2 text-xl font-semibold">Next.js demo page</span>
              <a
                href="https://github.com/nejiko96/vue3-ts-minesweeper"
                target="_blank"
                title="View source on GitHub"
                aria-label="View source on GitHub"
                className="rounded-md bg-black bg-opacity-0 px-2 py-4 hover:bg-opacity-30"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </a>
            </h1>

            <div className="flex items-center">
              <AppMenu className="mr-4" />
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default AppLayout