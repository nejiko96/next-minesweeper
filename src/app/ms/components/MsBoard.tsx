import React from 'react'

import classes from './MsBoard.module.css'

type Props = {
  grid: number[][]
  overlay: boolean
  children: React.ReactElement
}

const MsBoard: React.FC<Props> = ({ grid, overlay, children }) => {
  return (
    <div className={classes.board}>
      <div className={classes.cells}>
        {grid.map((arr, i) =>
          arr
            .map((value, j) =>
              React.cloneElement(children, {
                key: `${i}_${j}`,
                row: i,
                col: j,
                value,
              }),
            )
            .concat(<br key={i} />),
        )}
      </div>
      {overlay ? <div className={classes['cells-overlay']} /> : null}
    </div>
  )
}

export default MsBoard
