// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let locales = ['pt', 'en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verifica se o pathname já tem um locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Se não tiver, redireciona para o PT por padrão (ou faça lógica de detecção)
  const locale = 'pt'
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Ignora arquivos internos (_next, api, favicon, imagens em public)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ],
}