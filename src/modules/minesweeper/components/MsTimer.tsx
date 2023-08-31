import { useCallback, useEffect, useRef, useState } from 'react'

import { TimerModeEnum, type TimerModeType } from '../types'

const timeUnitTbl: Readonly<Record<string, number>> = {
  ms: 1,
  s: 1000,
}

type Props = {
  interval: string
  limit: number
  mode: TimerModeType
}

const MsTimer: React.FC<Props> = ({ interval, limit, mode }) => {
  // data
  const intervalMs: number = (() => {
    const match = /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec(interval.trim()) || []
    const num = (match[1] && parseFloat(match[1])) || 1000
    const mult = (match[2] && timeUnitTbl[match[2]]) || 1
    return num * mult
  })()
  const [count, setCount] = useState(0)
  const innerMode: TimerModeType = (() => {
    if (mode !== TimerModeEnum.RUNNING) return mode
    if (limit <= 0) return mode
    if (count < limit) return mode
    return TimerModeEnum.STOPPED
  })()

  // update counter
  const update = useCallback<(newCount?: number) => void>(
    (newCount) => {
      // console.log('updateCount', 'count', count, 'newCount', newCount);
      setCount(newCount === undefined ? count + 1 : newCount)
    },
    [count],
  )

  // hold latest version of update function
  const updateRef = useRef<(newCount?: number) => void>(null!)
  useEffect(() => {
    updateRef.current = update
  }, [update])

  // reset/start/stop/ event
  useEffect(() => {
    let intervalId = 0
    if (innerMode === TimerModeEnum.READY) {
      // console.log('timer ready');
      updateRef.current(0)
    } else if (innerMode === TimerModeEnum.RUNNING) {
      // console.log('timer running');
      intervalId = window.setInterval(() => updateRef.current(), intervalMs)
    } else {
      // console.log('timer stopped');
    }
    return () => window.clearInterval(intervalId)
  }, [innerMode, intervalMs])
  return <>{count}</>
}

export default MsTimer
