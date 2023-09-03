import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'

import { Transition } from '@headlessui/react'

import { useGame } from '../store/gameSlice'
import classes from '../styles/MsGame.module.css'
import {
  GameStatusEnum,
  GameStatusFlags,
  TimerModeEnum,
  type GameStatusType,
  type GridClickActionType,
  type GridPosActionType,
  type SizeSettingType,
  type ThemeSettingType,
  type TimerModeType,
} from '../types'

import MsBoard from './MsBoard'
import MsCell from './MsCell'
import MsNumberLabel from './MsNumberLabel'
import MsTimer from './MsTimer'

const timerModeTbl: Readonly<Record<GameStatusType, TimerModeType>> = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
}

type Props = {
  settings: {
    theme: ThemeSettingType
    board: SizeSettingType
  }
}

const MsGame: React.FC<Props> = ({ settings: { theme, board } }) => {
  // translation
  const { t } = useTranslation('ms')

  // connect to store
  const {
    game,
    changeSize,
    restart,
    mouseDown,
    mouseUp,
    mouseOver,
    mouseOut,
    touchStart,
    touchEnd,
    longPress,
  } = useGame()

  // data
  const remain = game.mines - Object.keys(game.markPos).length
  const overlay = (game.status & GameStatusFlags.ENABLED) > 0 && game.touch

  // game events
  useEffect(() => {
    changeSize(board)
  }, [board])
  const handleRestart: () => void = () => restart()
  const handleMouseDown: GridClickActionType = (params) => mouseDown(params)
  const handleMouseUp: GridPosActionType = (params) => mouseUp(params)
  const handleMouseOver: GridPosActionType = (params) => mouseOver(params)
  const handleMouseOut: GridPosActionType = (params) => mouseOut(params)
  const handleTouchStart: GridPosActionType = (params) => touchStart(params)
  const handleTouchEnd: GridPosActionType = (params) => touchEnd(params)
  const handleLongPress: GridPosActionType = (params) => longPress(params)

  return (
    <div
      className={'select-none p-8'}
      style={{
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      onContextMenu={(ev) => ev.preventDefault()}
    >
      <div className="mb-1 flex flex-row justify-start gap-5">
        <MsNumberLabel
          className="w-10"
          preStr={t`game.remain.pre`}
          postStr={t`game.remain.post`}
        >
          {remain}
        </MsNumberLabel>
        <MsNumberLabel
          className="w-10"
          preStr={t`game.timer.pre`}
          postStr={t`game.timer.post`}
        >
          <MsTimer interval="1s" limit={999} mode={timerModeTbl[game.status]} />
        </MsNumberLabel>
        <Transition
          as="span"
          show={game.status === GameStatusEnum.CLEARED}
          enterTo={classes['pyonpyon-enter-active']}
        >
          {t`game.cleared`}
        </Transition>
      </div>
      <MsBoard
        size={theme.size}
        grid={game.grid}
        overlay={overlay}
        className="mb-1"
      >
        <MsCell
          theme={theme}
          row={-1}
          col={-1}
          value={-1}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onLongPress={handleLongPress}
        />
      </MsBoard>
      <button
        className="block rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-300"
        type="button"
        onClick={handleRestart}
      >
        {t`game.retry`}
      </button>
    </div>
  )
}

export default MsGame
