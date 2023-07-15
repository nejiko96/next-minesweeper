import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { styleIdx } from '../models/cellModel'
import { GridClickType, GridPosType } from '../types'
import classes from './MsCell.module.css'

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
  onMouseDown: (params: GridClickType) => void
  onMouseUp: (params: GridPosType) => void
  onMouseOut: (params: GridPosType) => void
  onMouseOver: (params: GridPosType) => void
  onTouchStart: (params: GridPosType) => void
  onTouchEnd: (params: GridPosType) => void
  onLongPress: (params: GridPosType) => void
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

  // mouse events
  const handleMouseDown: React.MouseEventHandler<HTMLSpanElement> = (ev) =>
    onMouseDown({ button: ev.button, row, col })
  const handleMouseUp = () => onMouseUp({ row, col })
  const handleMouseEnter = () => onMouseOver({ row, col })
  const handleMouseLeave = () => onMouseOut({ row, col })

  // touch events
  const [touched, setTouched] = useState(false)
  const handleTouchStart = () => {
    // console.log('handleTouchStart');
    onTouchStart({ row, col })
    setTouched(true)
  }
  const handleTouchEnd: React.TouchEventHandler<HTMLSpanElement> = (ev) => {
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
    <span
      className={classNames(classes.cell, classes[themeClass])}
      style={{ backgroundPosition: getBgPos(size, value) }}
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