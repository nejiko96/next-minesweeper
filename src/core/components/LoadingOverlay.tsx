import { ColorRing } from 'react-loader-spinner'

type Props = {
  show: boolean
  text?: string
}

const LoadingOverlay: React.FC<Props> = ({ show, text }) => {
  return (
    show && (
      <div className="fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center gap-3 overflow-auto bg-black/40">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <p className="text-center">{text}</p>
      </div>
    )
  )
}
export default LoadingOverlay
