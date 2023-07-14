import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  changeSize,
  longPress,
  mouseDown,
  mouseOut,
  mouseOver,
  mouseUp,
  restart,
  selectGame,
  touchEnd,
  touchStart,
} from '../store/gameSlice'
import {
  GameStatusEnum,
  GameStatusFlags,
  GameStatusType,
  GridClickType,
  GridPosType,
  SizeSettingType,
  ThemeSettingType,
  TimerModeEnum,
  TimerModeType,
} from '../types'
import { initLocale } from '../utils/locale'
import classes from './MsGame.module.css'

import { Transition } from '@headlessui/react'
import MsBoard from './MsBoard'
import MsCell from './MsCell'
import MsTimer from './MsTimer'

const timerModeTbl: Readonly<Record<GameStatusType, TimerModeType>> = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
}

const PreventContextMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    lang: string
    theme: ThemeSettingType
    board: SizeSettingType
  }
}

const MsGame: React.FC<Props> = ({ settings: { lang, theme, board } }) => {
  // connect to store
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  // data
  const locale = initLocale(lang)
  const remain = game.mines - Object.keys(game.markPos).length
  const overlay = (game.status & GameStatusFlags.ENABLED) > 0 && game.touch

  // game events
  useEffect(() => {
    dispatch(changeSize(board))
  }, [board, dispatch])
  const handleRestart = () => dispatch(restart())
  const handleMouseDown = (params: GridClickType) => dispatch(mouseDown(params))
  const handleMouseUp = (params: GridPosType) => dispatch(mouseUp(params))
  const handleMouseOver = (params: GridPosType) => dispatch(mouseOver(params))
  const handleMouseOut = (params: GridPosType) => dispatch(mouseOut(params))
  const handleTouchStart = (params: GridPosType) => dispatch(touchStart(params))
  const handleTouchEnd = (params: GridPosType) => dispatch(touchEnd(params))
  const handleLongPress = (params: GridPosType) => dispatch(longPress(params))

  return (
    <PreventContextMenu>
      <div className={classes.container}>
        {locale.remain1}
        <span className={classes['text-box']}>{remain}</span>
        {locale.remain2}
        <span className={classes.space}></span>
        {locale.timer1}
        <MsTimer
          className={classes['text-box']}
          interval="1s"
          limit={999}
          mode={timerModeTbl[game.status]}
        />
        {locale.timer2}
        <span className={classes.space}></span>
        <Transition
          as="span"
          show={game.status === GameStatusEnum.CLEARED}
          enterTo={classes['pyonpyon-enter-active']}
        >
          {locale.cleared}
        </Transition>
        {/* {game.status === GameStatusEnum.CLEARED && locale.cleared} */}
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
          {locale.retry}
        </button>
      </div>
    </PreventContextMenu>
  )
}

export default MsGame
