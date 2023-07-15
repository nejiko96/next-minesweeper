'use client'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HTMLAttributes } from 'react'

const menuItems = [
  {
    title: 'Minesweeper',
    path: '/ms',
  },
  {
    title: 'Cat API',
    path: '/cat',
  },
  {
    title: 'Wordle Helper',
    path: '/wordle',
  },
  {
    title: 'Nerdle Helper',
    path: '/nerdle',
  },
  {
    title: 'Slide Puzzle',
    path: '/slide',
  },
  {
    title: 'Flag Training',
    path: '/flag_training',
  },
  {
    title: 'Flag Quiz',
    path: '/flag_quiz',
  },
]

type Props = HTMLAttributes<HTMLDivElement>

const AppMenu: React.FC<Props> = ({ className }) => {
  // next.js app router
  const router = useRouter()

  return (
    <Menu as="div" className={classNames('relative', className)}>
      <Menu.Button className="rounded-md bg-black bg-opacity-0 px-4 py-2 hover:bg-opacity-30">
        Menu
        <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((item) => {
            return (
              <div key={item.path} className="p-1">
                <Menu.Item disabled={item.path === router.pathname}>
                  {({ active }) => (
                    <Link
                      className={classNames(
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        {
                          'text-gray-400': item.path === router.pathname,
                          'bg-teal-500 text-white': item.path !== router.pathname && active,
                          'text-gray-900': item.path !== router.pathname && !active,
                        },
                      )}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default AppMenu
