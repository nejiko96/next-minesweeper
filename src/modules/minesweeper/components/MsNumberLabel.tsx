import classNames from 'classnames'
import { type HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement> & {
  preStr?: string
  postStr?: string
  children: React.ReactNode
}

const MsNumberLabel: React.FC<Props> = ({
  preStr,
  postStr,
  children,
  className,
  ...props
}) => {
  return (
    <span>
      {preStr && preStr + ' '}
      <span
        className={classNames(
          className,
          'inline-block border border-gray-300 bg-gray-100 px-0.5 text-right text-black',
        )}
        {...props}
      >
        {children}
      </span>
      {postStr && ' ' + postStr}
    </span>
  )
}

export default MsNumberLabel
