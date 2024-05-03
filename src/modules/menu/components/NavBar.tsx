import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import AppMenu from './AppMenu'
import LanguageToggle from './LanguageToggle'

const NavBar: React.FC = () => {
  // translation
  const { t, lang } = useTranslation('common')

  return (
    <nav className="bg-sky-500 text-white">
      <div className="container mx-auto flex h-16 items-center px-2 py-4">
        <h1>
          <Link href={`/${lang}`} className="text-xl font-semibold">
            {t`header.title`}
          </Link>{' '}
          <a
            href="https://github.com/nejiko96/next-minesweeper"
            target="_blank"
            title="View source on GitHub"
            aria-label="View source on GitHub"
            className="rounded-md bg-black/0 px-2 py-4 hover:bg-black/30"
          >
            <FontAwesomeIcon icon={faGithub} size="2xl" />
          </a>
        </h1>
        <div className="grow" />
        <AppMenu className="mr-4" />
        <LanguageToggle className="" />
      </div>
    </nav>
  )
}
export default NavBar
