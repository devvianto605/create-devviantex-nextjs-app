/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { locales } from '~/lib/next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as never)) notFound();

  const messages = (await import(`../messages/${locale}/${locale}.json`))
    .default;

  return { messages };
});
