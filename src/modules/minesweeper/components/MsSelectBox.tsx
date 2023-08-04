import type { SelectHTMLAttributes } from 'react'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SelectOptionType = Readonly<{
  id: string
  name: string
}>

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Readonly<SelectOptionType[]>
}

const MsSelectBox: React.FC<Props> = ({ id, label, options, ...props }) => {
  return (
    <div className="mb-6 w-full px-3">
      <label
        className="mb-2 block text-sm font-semibold tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-1 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FontAwesomeIcon icon={faAngleDown} size="xs" />
        </div>
      </div>
    </div>
  )
}

export default MsSelectBox
