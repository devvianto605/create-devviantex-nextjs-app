import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'th'] as const;
export const localePrefix = 'always';
export const defaultLocale = 'th';
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

export type Locale = (typeof locales)[number];
