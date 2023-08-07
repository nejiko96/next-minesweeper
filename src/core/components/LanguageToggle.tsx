'use client'

import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type HTMLAttributes } from 'react'

import { Switch } from '@headlessui/react'

type Props = HTMLAttributes<HTMLDivElement>

const LanguageToggle: React.FC<Props> = ({ className }) => {
  const { lang } = useTranslation()
  // get pathname from app router
  // and remove leading '/[lang]'
  const pathname = '/' + (usePathname().split('/', 3)[2] ?? '')
  const router = useRouter()

  const [enabled, setEnabled] = useState(lang === 'en')

  useEffect(() => {
    if (enabled) {
      router.push(`/en${pathname}`)
    } else {
      router.push(`/ja${pathname}`)
    }
  }, [enabled, pathname, router])

  return (
    <div className={classNames('flex items-center', className)}>
      <span
        className="flex cursor-pointer rounded-lg bg-black/0 p-1.5 text-3xl hover:bg-black/30"
        onClick={() => setEnabled(false)}
      >
        <Image
          src="/assets/JP.svg"
          alt="🇯🇵"
          width={30}
          height={20}
          priority
          className="inline"
        />
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          'relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
          enabled ? 'bg-sky-300' : 'bg-sky-200',
        )}
      >
        <span className="sr-only">Language</span>
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-7' : 'translate-x-0',
          )}
        ></span>
      </Switch>
      <span
        className="flex cursor-pointer rounded-lg bg-black/0 p-1.5 text-3xl hover:bg-black/30"
        onClick={() => setEnabled(true)}
      >
        <Image
          src="/assets/GB.svg"
          alt="🇬🇧"
          width={30}
          height={20}
          priority
          className="inline"
        />
      </span>
    </div>
  )
}

export default LanguageToggle
