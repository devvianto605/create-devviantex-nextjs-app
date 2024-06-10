import { localePrefix, locales, defaultLocale } from '~/lib/next-intl';
import createIntlMiddleware from 'next-intl/middleware';
import {
  NextFetchEvent,
  NextMiddleware,
  type NextRequest,
} from 'next/server';

export default middleware(
  createIntlMiddleware({
    defaultLocale,
    locales,
    localePrefix,
  }),
);

function middleware(intlMiddleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    return await intlMiddleware(req, event);
  };
}

export const config = {
  matcher: ['/', '/(th|en)/:path*'],
};
