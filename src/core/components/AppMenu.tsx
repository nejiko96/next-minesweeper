'use client'

import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { HTMLAttributes } from 'react'
import { Fragment } from 'react'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'

const menuItems = [
  {
    path: '/ms',
  },
  {
    path: '/cat',
  },
  {
    path: '/wordle',
  },
  {
    path: '/nerdle',
  },
  {
    path: '/slide',
  },
  {
    path: '/flag_training',
  },
  {
    path: '/flag_quiz',
  },
] as const

type Props = HTMLAttributes<HTMLDivElement>

const AppMenu: React.FC<Props> = ({ className }) => {
  const { t, lang } = useTranslation('common')
  // get pathname from app router
  // and remove leading '/[lang]'
  const pathname = '/' + (usePathname().split('/', 3)[2] ?? '')

  return (
    <Menu as="div" className={classNames('relative', className)}>
      <Menu.Button className="rounded-md bg-black/0 px-4 py-2 hover:bg-black/30">
        <>
          {t`menu.title`} <FontAwesomeIcon icon={faAngleDown} />
        </>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {menuItems.map((item) => (
            <div key={item.path} className="p-1">
              <Menu.Item disabled={item.path === pathname}>
                {({ active }) => (
                  <Link
                    className={classNames(
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      {
                        'text-gray-400': item.path === pathname,
                        'bg-sky-500 text-white':
                          item.path !== pathname && active,
                        'text-gray-900': item.path !== pathname && !active,
                      },
                    )}
                    href={`/${lang}${item.path}`}
                  >
                    {t('menu.items' + item.path.replaceAll('/', '.'))}
                  </Link>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default AppMenu
