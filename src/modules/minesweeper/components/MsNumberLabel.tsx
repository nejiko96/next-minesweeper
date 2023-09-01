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
    <>
      {preStr && preStr + ' '}
      <span
        className={classNames(
          className,
          'border border-gray-300 bg-gray-100 px-0.5 text-right text-black',
        )}
        {...props}
      >
        {children}
      </span>
      {postStr && ' ' + postStr}
    </>
  )
}

export default MsNumberLabel
