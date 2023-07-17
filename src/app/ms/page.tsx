'use client'

import MsGame from '@/modules/minesweeper/components/MsGame'
import MsSettings from '@/modules/minesweeper/components/MsSettings'
import { selectSettings } from '@/modules/minesweeper/store/settingsSlice'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const MsHome: React.FC = () => {
  // connect to store
  const settings = useSelector(selectSettings)

  // data
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <div className="relative p-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold">Minesweeper Game</h1>
        </div>
        <MsGame settings={settings} />
        <button
          className="absolute right-2.5 top-2.5 mb-2 mr-2 rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800"
          type="button"
          aria-controls="drawer-right"
          onClick={() => setSettingsOpen(true)}
        >
          <FontAwesomeIcon icon={faGear} /> Settings
        </button>

        <Transition
          as="div"
          className="absolute right-0 top-0 h-[calc(100vh_-_5rem)] w-80"
          show={settingsOpen}
          enter="transition-transform duration-500 ease"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-500 ease"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <MsSettings onClose={() => setSettingsOpen(false)} />
        </Transition>
      </div>
    </>
  )
}

export default MsHome
