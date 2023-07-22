import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const MsHelpPanelJp: React.FC = () => {
  return (
    <div className="mt-2 text-sm">
      <h5 className="font-bold">盤面</h5>
      <p className="mb-2">
        マインスイーパーの盤面は、グリッド状に配置されたタイルで構成されています。一部のタイルには地雷が隠されています。
      </p>
      <h5 className="font-bold">目的</h5>
      <p className="mb-2">
        地雷を開けないようにして地雷のないタイルをすべて開いてください
      </p>
      <h5 className="font-bold">開く</h5>
      <p className="mb-2">
        タイルをクリックすると開き、以下のいずれかが表示されます。
        <dl className="ml-4 mt-1">
          <dt className="font-semibold">数字</dt>
          <dd className="mb-1">
            周囲の8つのタイルに隠されている地雷の数が表示されます。この情報を利用して、地雷の位置を推測します。
          </dd>
          <dt className="font-semibold">空白</dt>
          <dd className="mb-1">
            周囲に地雷がないことを表します。また、周囲のタイルも自動的に開きます。空白が続く場合は連鎖的に開きます。
          </dd>
          <dt className="font-semibold">地雷</dt>
          <dd className="">地雷を開けるとゲームオーバーです。</dd>
        </dl>
      </p>
      <h5 className="font-bold">旗を立てる</h5>
      <p className="">
        地雷がありそうなタイルには誤って開けないように旗を立てることができます。旗を立てるには、タイルを右クリック(タッチデバイスは長押し)します。
      </p>
    </div>
  )
}

const MsHelpPanelEn: React.FC = () => {
  return (
    <div className="mt-2 text-sm">
      <h5 className="font-bold">Game Board</h5>
      <p className="mb-2">
        The Minesweeper game board consists of tiles arranged in a grid. Some of
        the tiles hide mines.
      </p>
      <h5 className="font-bold">Objective</h5>
      <p className="mb-2">
        Avoid opening mines and uncover all tiles without mines.
      </p>
      <h5 className="font-bold">Revealing Tiles</h5>
      <p className="mb-2">
        Click on a tile to reveal it, and it will show one of the following:
        <dl className="ml-4 mt-1">
          <dt className="font-semibold">Number</dt>
          <dd className="mb-1">
            Indicates the number of mines hidden in the eight adjacent tiles.
            Use this information to deduce the positions of the mines.
          </dd>
          <dt className="font-semibold">Blank</dt>
          <dd className="mb-1">
            Indicates that there are no mines in the surrounding tiles.
            Additionally, adjacent tiles will automatically open. If there are
            consecutive blanks, they will open in a chain reaction.
          </dd>
          <dt className="font-semibold">Mine</dt>
          <dd className="">Revealing a mine will result in a game over.</dd>
        </dl>
      </p>
      <h5 className="font-bold">Placing Flags</h5>
      <p className="">
        To prevent accidental tile reveals, you can place a flag on tiles that
        you suspect contain mines. Right-click on the tile (or long-press on
        touch devices) to place a flag.
      </p>
    </div>
  )
}

type Props = {
  lang: string
  isOpen: boolean
  onClose: () => void
}

const MsHelpDialog: React.FC<Props> = ({ lang, isOpen, onClose }) => {
  return (
    <>
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
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-500 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    {lang === 'ja'
                      ? 'マインスイーパーの遊び方'
                      : 'How to Play Minesweeper'}
                  </Dialog.Title>
                  {lang === 'ja' ? <MsHelpPanelJp /> : <MsHelpPanelEn />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MsHelpDialog
