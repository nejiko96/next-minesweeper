import classNames from 'classnames'
import { type HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: number | React.ReactNode
}

const MsNumberLabel: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <span
      className={classNames(
        className,
        'border border-gray-300 bg-gray-100 px-0.5 text-right text-black',
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default MsNumberLabel
