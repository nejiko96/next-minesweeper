'use client'

import useTranslation from 'next-translate/useTranslation'
import {
  createRef,
  useCallback,
  useEffect,
  useState,
  type ReactEventHandler,
} from 'react'

import { Transition } from '@headlessui/react'
import FlipMove from 'react-flip-move'

import LoadingOverlay from '@/core/components/LoadingOverlay'
import SlidePuzzle from '../models/SlidePuzzle'
import SlidePuzzleSolver from '../models/SlidePuzzleSolver'
import { fetchCatImage } from '../models/catApi'

const model = new SlidePuzzle(4)
const solver = new SlidePuzzleSolver()

const SlidePuzzleView = () => {
  // translation
  const { t } = useTranslation('slide')

  ///
  /// Slide Puzzle Control
  ///

  // data
  const [grid, setGrid] = useState<number[][]>([])

  // computed values
  const complete = model.isComplete(grid)

  // events
  const slideGrid = (i: number, j: number): void => {
    const grid2 = JSON.parse(JSON.stringify(grid))
    model.slideAt(grid2, i, j)
    setGrid(grid2)
  }

  const handleClick = (i: number, j: number): void => {
    if (path) return
    slideGrid(i, j)
  }

  ///
  /// Autopilot feature
  ///

  // data
  const [path, setPath] = useState<number[][] | null>(null)

  // events
  const consumePath = () => {
    if (path?.length) {
      const [i, j] = path[0]
      setPath(path.slice(1))
      slideGrid(i, j)
    }
  }

  useEffect(() => {
    let timerId = 0
    if (path?.length) {
      timerId = window.setTimeout(consumePath, 500)
    }
    return () => window.clearTimeout(timerId)
  }, [path])

  const toggleAutopilot = () => {
    if (path) {
      setPath(null)
    } else {
      setPath(solver.solve(grid))
    }
  }

  ///
  /// Cat Image Control
  ///

  // data
  const [catImageUrl, setCatImageUrl] = useState('')
  const imgRef = createRef<HTMLImageElement>()

  // events
  const updateCatImage = async () => {
    setCatImageUrl('')
    const image = await fetchCatImage()
    setCatImageUrl(image.url)
  }

  const loadedCatImage: ReactEventHandler<HTMLImageElement> = () => {
    setBgSize({
      width: imgRef.current?.width || 500,
      height: imgRef.current?.height || 500,
    })
    setIsLoading(false)
  }

  ///
  /// Panel Control
  ///

  // data
  const [bgSize, setBgSize] = useState({ width: 500, height: 500 })

  // computed values
  const bgPos = useCallback(
    (v: number): string => {
      const [i, j] = model.pos2D(v - 1)
      const [x, y] = [
        ((bgSize.width * j) / model.w) | 0,
        ((bgSize.height * i) / model.h) | 0,
      ]
      return `-${x + 2}px -${y + 2}px`
    },
    [bgSize],
  )

  ///
  /// Entire Control
  ///
  const [isLoading, setIsLoading] = useState(false)

  const handleRestart = (): void => {
    setIsLoading(true)
    setGrid(model.generateGrid())
    setPath(null)
    updateCatImage()
  }

  useEffect(handleRestart, [])

  return (
    <>
      <LoadingOverlay show={isLoading} text={t`loading`} />
      <div className="p-4 text-center">
        <h1 className="mb-10 text-3xl font-semibold">{t`title`}</h1>
        {catImageUrl && (
          <div className="relative mx-auto mb-6 w-[600px] border-2 border-amber-200">
            <img
              ref={imgRef}
              src={catImageUrl}
              alt="Cat Image"
              className="h-auto w-full"
              onLoad={loadedCatImage}
            />
            {!isLoading && (
              <Transition
                as="div"
                className="absolute inset-0"
                show={!complete}
                leave="transition-opacity duration-[2s] ease-linear"
                leaveTo="opacity-0"
              >
                <FlipMove
                  duration={250}
                  easing="ease-out"
                  className="h-full bg-gray-500"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${model.w}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${model.h}, minmax(0, 1fr))`,
                  }}
                >
                  {grid.flatMap((arr, i) =>
                    arr.map((v, j) =>
                      v < model.s ? (
                        <div
                          key={v}
                          className="inline-flex h-full select-none items-center justify-center border-2 border-amber-200 text-4xl font-bold text-white"
                          style={{
                            backgroundImage: `url('${catImageUrl}')`,
                            backgroundPosition: bgPos(v),
                            backgroundSize: `${bgSize.width}px ${bgSize.height}px`,
                            WebkitTextStroke: '1px #000',
                          }}
                          role="button"
                          onClick={() => handleClick(i, j)}
                        >
                          {v}
                        </div>
                      ) : (
                        <div key={v} className="h-full bg-transparent" />
                      ),
                    ),
                  )}
                </FlipMove>
              </Transition>
            )}
          </div>
        )}
        {!complete && (
          <button
            className="mr-2 cursor-pointer rounded border-2 border-transparent bg-amber-500 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:border-amber-300 hover:bg-amber-600"
            onClick={toggleAutopilot}
          >
            {path ? t`autopilot.stop` : t`autopilot.start`}
          </button>
        )}
        <button
          className="mr-2 cursor-pointer rounded border-2 border-transparent bg-amber-500 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:border-amber-300 hover:bg-amber-600"
          onClick={handleRestart}
        >
          {t`restart`}
        </button>
      </div>
    </>
  )
}

export default SlidePuzzleView
