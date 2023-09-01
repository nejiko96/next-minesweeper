import { type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string }

const MsNumberInput: React.FC<Props> = ({ id, label, ...props }) => {
  return (
    <div className="mb-6 w-full px-3">
      <label
        className="mb-2 block text-sm font-semibold tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        type="number"
        {...props}
      />
    </div>
  )
}

export default MsNumberInput
