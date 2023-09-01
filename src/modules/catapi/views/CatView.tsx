'use client'

import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import LoadingOverlay from '@/core/components/LoadingOverlay'
import { fetchCatImage } from '../models/catApi'

const EMPTY_IMG_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

const CatView: React.FC = () => {
  // translation
  const { t } = useTranslation('cat')

  const [catImageUrl, setCatImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const updateCatImage = async () => {
    setIsLoading(true)
    const image = await fetchCatImage()
    setCatImageUrl(image.url)
  }

  const loadedCatImage = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    updateCatImage()
  }, [])

  return (
    <>
      <LoadingOverlay show={isLoading} text={t`loading`} />
      <div className="p-4">
        <button
          className="mx-auto block cursor-pointer rounded border-2 border-transparent bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:border-red-300 hover:bg-red-600"
          onClick={updateCatImage}
        >
          {t`button`}
        </button>
        <div className="relative mx-auto mt-4 h-screen w-3/5">
          {catImageUrl && (
            <Image
              src={catImageUrl}
              fill
              style={{ objectFit: 'contain', objectPosition: '50% top' }}
              alt="Cat Image"
              placeholder="blur"
              blurDataURL={EMPTY_IMG_URL}
              onLoadingComplete={loadedCatImage}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default CatView
