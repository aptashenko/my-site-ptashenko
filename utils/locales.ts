import { supportedLocales } from '~/data/translations';
import type { Locale } from '~/types/i18n';

export const fallbackLocale: Locale = 'en';

export const normalizeLocale = (value?: string | null): Locale | null => {
  const language = value?.toLowerCase().split(/[-_]/)[0];

  if (language && supportedLocales.includes(language as Locale)) {
    return language as Locale;
  }

  return null;
};

export const getLocaleFromAcceptLanguage = (header?: string): Locale => {
  const browserLocale = header
    ?.split(',')
    .map((item) => normalizeLocale(item.trim().split(';')[0]))
    .find(Boolean);

  return browserLocale ?? fallbackLocale;
};

export const getLocaleFromNavigator = (): Locale | null => {
  if (!import.meta.client) {
    return null;
  }

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  return languages.map((language) => normalizeLocale(language)).find(Boolean) ?? null;
};
