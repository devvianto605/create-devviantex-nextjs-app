import { getToken } from 'next-auth/jwt';
import { localePrefix, locales, defaultLocale } from '~/lib/next-intl';
import { ROUTES } from '~/routes';
import createIntlMiddleware from 'next-intl/middleware';
import {
  NextFetchEvent,
  NextMiddleware,
  NextResponse,
  type NextRequest,
} from 'next/server';

const localeValidator = (locale: 'en' | 'th') => {
  return locales.includes(locale);
};

export default middleware(
  createIntlMiddleware({
    defaultLocale,
    locales,
    localePrefix,
  }),
);

function middleware(intlMiddleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const token = await getToken({ req });

    // Check whether the locale is invalid or missing. if true, set default locale to the path.
    const [, locale] = req.nextUrl.pathname.split('/');
    const isLocale = localeValidator(locale as 'th' | 'en');
    const validatedLocale = isLocale ? `/${locale}` : `'/${defaultLocale}`;

    const isProtectRoute =
      req.nextUrl.pathname.startsWith(
        `${validatedLocale}${ROUTES.DASHBOARD
        }`,
      )

    // If want to prevent user from accessing all route by some conditions and 'NextResponse.redirect(url)' doesn't work
    // if (!isWithinServicePeriod) {
    //   const url = new URL(
    //     `${BASE_PATH}${validatedLocale}${ROUTES.SERVICE_UNAVAILABLE}`,
    //     req.url,
    //   );
    //   // Somehow 'NextResponse.redirect(url)' doesn't work for Static Site Generated Page
    //   // Use this instead and and it works like a charm <3.
    //   const response = await intlMiddleware(req, event);
    //   response?.headers.set('x-middleware-rewrite', url.toString());

    //   return response;
    // }
    
    if (isProtectRoute) {
      if (token !== null) {
        return await intlMiddleware(req, event);
      }

      const url = new URL(
        `${validatedLocale}${ROUTES.LOGIN}`,
        req.url,
      );

      return NextResponse.redirect(url);
    }

    return await intlMiddleware(req, event);
  };
}

export const config = {
  matcher: ['/', '/(th|en)/:path*'],
};
