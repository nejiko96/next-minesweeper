import { useEffect, useState } from 'react'

import { styleIdx } from '../models/cellModel'
import classes from '../styles/MsCell.module.css'
import { type GridClickActionType, type GridPosActionType } from '../types'

const calcBgPos: (s: number, v: number) => string = (s, v) => {
  const i = styleIdx(v)
  const x = -s * (i % 3)
  const y = -s * ((i / 3) | 0)
  return `${x}px ${y}px`
}

const bgPosCache: Record<number, Record<number, string>> = {}

const getBgPos: (s: number, v: number) => string = (s, v) => {
  bgPosCache[s] ??= {}
  bgPosCache[s][v] ??= calcBgPos(s, v)
  return bgPosCache[s][v]
}

type Props = {
  theme: { name: string; size: number }
  row: number
  col: number
  value: number
  onMouseDown: GridClickActionType
  onMouseUp: GridPosActionType
  onMouseOut: GridPosActionType
  onMouseOver: GridPosActionType
  onTouchStart: GridPosActionType
  onTouchEnd: GridPosActionType
  onLongPress: GridPosActionType
}

const MsCell: React.FC<Props> = ({
  theme: { name, size },
  row,
  col,
  value,
  onMouseDown,
  onMouseUp,
  onMouseOut,
  onMouseOver,
  onTouchStart,
  onTouchEnd,
  onLongPress,
}) => {
  // data
  const themeClass = `${name}-${size}`.toLowerCase()
  const bgPos = getBgPos(size, value)

  // mouse events
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (ev) =>
    onMouseDown({ button: ev.button, row, col })
  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () =>
    onMouseUp({ row, col })
  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () =>
    onMouseOver({ row, col })
  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () =>
    onMouseOut({ row, col })

  // touch events
  const [touched, setTouched] = useState(false)
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = () => {
    // console.log('handleTouchStart');
    onTouchStart({ row, col })
    setTouched(true)
  }
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (ev) => {
    // console.log('handleTouchEnd');
    if (touched) {
      setTouched(false)
      onTouchEnd({ row, col })
    }
    ev.preventDefault() // disable double tap zoom
  }
  useEffect(() => {
    // console.log('touched', touched);
    let timerId = 0
    if (touched) {
      timerId = window.setTimeout(() => {
        // console.log('detected longpress');
        setTouched(false)
        onLongPress({ row, col })
      }, 300)
    }
    return () => window.clearTimeout(timerId)
  }, [row, col, touched, onLongPress])

  return (
    <div
      className={classes[themeClass]}
      style={{ backgroundPosition: bgPos }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocus={() => undefined}
      onBlur={() => undefined}
      role="button"
      aria-label="cell"
      tabIndex={-1}
    />
  )
}

export default MsCell
