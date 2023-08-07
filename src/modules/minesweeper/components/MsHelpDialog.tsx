import useTranslation from 'next-translate/useTranslation'
import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const MsHelpDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  // translation
  const { t } = useTranslation('ms')

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-500 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  {t`help.title`}
                </Dialog.Title>
                <div className="mt-2 text-sm">
                  <h5 className="font-bold">{t`help.board.title`}</h5>
                  <p className="mb-2 ml-4 whitespace-pre">{t`help.board.description`}</p>
                  <h5 className="font-bold">{t`help.objective.title`}</h5>
                  <p className="mb-2 ml-4 whitespace-pre">{t`help.objective.description`}</p>
                  <h5 className="font-bold">{t`help.open.title`}</h5>
                  <p className="mb-2 ml-4 whitespace-pre">
                    {t`help.open.description`}
                    <dl className="mt-1">
                      <dt className="font-semibold">{t`help.open.number.title`}</dt>
                      <dd className="mb-1 ml-4 whitespace-pre">{t`help.open.number.description`}</dd>
                      <dt className="font-semibold">{t`help.open.blank.title`}</dt>
                      <dd className="mb-1 ml-4 whitespace-pre">{t`help.open.blank.description`}</dd>
                      <dt className="font-semibold">{t`help.open.mine.title`}</dt>
                      <dd className="ml-4 whitespace-pre">{t`help.open.mine.description`}</dd>
                    </dl>
                  </p>
                  <h5 className="font-bold">{t`help.flag.title`}</h5>
                  <p className="ml-4 whitespace-pre">{t`help.flag.description`}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MsHelpDialog
