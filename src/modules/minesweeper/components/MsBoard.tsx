import classNames from 'classnames'
import React, { type HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  size: number
  grid: number[][]
  overlay: boolean
  children: React.ReactElement
}

const MsBoard: React.FC<Props> = ({
  size,
  grid,
  overlay,
  className,
  children,
}) => {
  return (
    <div className={classNames('relative', className)}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, ${size}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${size}px)`,
        }}
      >
        {grid.flatMap((arr, i) =>
          arr.map((value, j) =>
            React.cloneElement(children, {
              key: `${i}_${j}`,
              row: i,
              col: j,
              value,
            }),
          ),
        )}
      </div>
      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/10" />
      )}
    </div>
  )
}

export default MsBoard
