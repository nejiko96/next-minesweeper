'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { fetchCatImage } from '../models/catApi'

const CatView: React.FC = () => {
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
    <div className="p-4">
      <button
        className="mx-auto block cursor-pointer rounded border-2 border-transparent bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:border-red-300 hover:bg-red-600"
        onClick={updateCatImage}
      >
        Today&apos;s Cat
      </button>
      <div className="relative mx-auto mt-4 h-screen w-3/5">
        <Image
          src={catImageUrl}
          fill
          style={{ objectFit: 'contain', objectPosition: '50% top' }}
          alt="Cat Image"
          onLoad={loadedCatImage}
        />
      </div>
    </div>
  )
}
export default CatView
