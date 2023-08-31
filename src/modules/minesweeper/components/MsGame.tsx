import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef } from 'react'

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
import MsTimer from './MsTimer'

const timerModeTbl: Readonly<Record<GameStatusType, TimerModeType>> = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
}

const PreventContextMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // disable context menu
  const node = useRef<HTMLDivElement>(null)
  const handleContextMenu: (e: MouseEvent) => void = (e) => e.preventDefault()
  useEffect(() => {
    const curNode = node.current as HTMLDivElement
    curNode.addEventListener('contextmenu', handleContextMenu)
    return () => curNode.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return <div ref={node}>{children}</div>
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
    <PreventContextMenu>
      <div className={classes.container}>
        {t`game.remain.pre`}{' '}
        <span className={classes['text-box']}>{remain}</span>{' '}
        {t`game.remain.post`}
        <span className="w-5" />
        {t`game.timer.pre`}{' '}
        <MsTimer
          className={classes['text-box']}
          interval="1s"
          limit={999}
          mode={timerModeTbl[game.status]}
        />{' '}
        {t`game.timer.post`}
        <span className="w-5" />
        <Transition
          as="span"
          show={game.status === GameStatusEnum.CLEARED}
          enterTo={classes['pyonpyon-enter-active']}
        >
          {t`game.cleared`}
        </Transition>
        <br />
        <MsBoard grid={game.grid} overlay={overlay}>
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
        <br />
        <button
          className="rounded bg-gray-400 px-4 py-2 text-black hover:bg-gray-300"
          type="button"
          onClick={handleRestart}
        >
          {t`game.retry`}
        </button>
      </div>
    </PreventContextMenu>
  )
}

export default MsGame
