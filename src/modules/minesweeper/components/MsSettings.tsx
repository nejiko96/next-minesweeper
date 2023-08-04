import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition } from '@headlessui/react'

import { useSettings } from '../store/settingsSlice'

import MsNumberInput from './MsNumberInput'
import MsSelectBox from './MsSelectBox'

const langOptions = [
  { id: 'en', name: 'English' },
  { id: 'ja', name: '日本語' },
] as const

const themeOptions = [
  { id: 'green_32', name: 'green(32px)' },
  { id: 'MS_32', name: 'MS(32px)' },
  { id: 'green_16', name: 'green(16px)' },
  { id: 'MS_16', name: 'MS(16px)' },
] as const

const levelOptions = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
  { id: 'custom', name: 'Custom' },
] as const

type Props = {
  onClose: () => void
}

const MsSettings: React.FC<Props> = ({ onClose }) => {
  // connect to store
  const {
    settings: {
      lang,
      theme: { name, size },
      board: { level, width, height, mines },
    },
    changeLang,
    changeTheme,
    changeLevel,
    changeWidth,
    changeHeight,
    changeMines,
  } = useSettings()

  // events
  const handleClose = () => onClose()
  const handleLangChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) =>
    changeLang(ev.target.value)
  const handleThemeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    ev,
  ) => {
    const [newName, newSize] = ev.target.value.split('_')
    changeTheme({
      name: newName,
      size: Number(newSize),
    })
  }
  const handleLevelChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) =>
    changeLevel(ev.target.value)
  const handleWidthChange: React.ChangeEventHandler<HTMLInputElement> = (
    ev,
  ) => {
    const newWidth = ev.target.value
    changeWidth(newWidth && Number(newWidth))
  }
  const handleHeightChange: React.ChangeEventHandler<HTMLInputElement> = (
    ev,
  ) => {
    const newHeight = ev.target.value
    changeHeight(newHeight && Number(newHeight))
  }
  const handleMinesChange: React.ChangeEventHandler<HTMLInputElement> = (
    ev,
  ) => {
    const newMines = ev.target.value
    changeMines(newMines && Number(newMines))
  }

  return (
    <>
      <div
        id="drawer-right"
        className="h-full overflow-y-auto overflow-x-hidden bg-white p-4 dark:bg-black"
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
        aria-modal="true"
        role="dialog"
      >
        <span
          id="drawer-right-label"
          className="mb-4 inline-flex items-center text-base font-semibold"
        >
          <FontAwesomeIcon icon={faGear} />
          Settings
        </span>

        <button
          type="button"
          aria-controls="drawer-right"
          className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
          <span className="sr-only">Close menu</span>
        </button>

        <form className="w-full">
          <MsSelectBox
            id="lang"
            value={lang}
            label="Language"
            options={langOptions}
            onChange={handleLangChange}
          />
          <MsSelectBox
            id="theme"
            value={`${name}_${size}`}
            label="Theme"
            options={themeOptions}
            onChange={handleThemeChange}
          />
          <MsSelectBox
            id="level"
            value={level}
            label="Level"
            options={levelOptions}
            onChange={handleLevelChange}
          />

          <Transition
            show={level === 'custom'}
            enter="transition-transform duration-500 ease"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-500 ease"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div>
              <MsNumberInput
                id="width"
                value={width}
                label="Width"
                min="9"
                max="30"
                step="1"
                placeholder="9 - 30"
                onChange={handleWidthChange}
              />
              <MsNumberInput
                id="height"
                value={height}
                label="Height"
                min="9"
                max="24"
                step="1"
                placeholder="9 - 24"
                onChange={handleHeightChange}
              />
              <MsNumberInput
                id="mines"
                value={mines}
                label="Mines"
                min="10"
                max="999"
                step="1"
                placeholder="10 - 999"
                onChange={handleMinesChange}
              />
            </div>
          </Transition>
        </form>
      </div>
    </>
  )
}

export default MsSettings
