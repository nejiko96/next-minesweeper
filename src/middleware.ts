// https://github.com/aralroca/next-translate#14-use-next-13-app-directory
// https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router
// https://locize.com/blog/next-13-app-dir-i18n/
// https://zenn.dev/sasigume/articles/937a11c655b15c

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import acceptLanguage from 'accept-language'
import i18nConfig from '../i18n.json'

acceptLanguage.languages(i18nConfig.locales)

function getUserLocale(request: NextRequest) {
  return acceptLanguage.get(request.headers.get('Accept-Language')) ?? 'en'
}

export function middleware(request: NextRequest) {
  const { pathname, locale, search } = request.nextUrl
  // console.log([pathname, locale, search])

  // Always include the language prefix in the pathname
  // (to inform next-translate about the correct language)
  if (locale === i18nConfig.defaultLocale) {
    const userLocale = getUserLocale(request)
    return NextResponse.redirect(
      new URL(`/${userLocale}${pathname}${search}`, request.url),
    )
  }
}

export const config = {
  matcher: ['/((?!_next|assets|favicons|favicon.ico).*)'],
}
