import { translations } from '~/data/translations';
import type { Locale } from '~/types/i18n';

const storageKey = 'preferred-locale';

export const useSiteLocale = () => {
  const requestHeaders = import.meta.server
    ? useRequestHeaders(['accept-language'])
    : {};

  const locale = useState<Locale>('site-locale', () =>
    getLocaleFromAcceptLanguage(requestHeaders['accept-language']),
  );
  const isInitialized = useState('site-locale-initialized', () => false);

  const content = computed(() => translations[locale.value]);

  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale;

    if (import.meta.client) {
      window.localStorage.setItem(storageKey, nextLocale);
    }
  };

  onMounted(() => {
    if (isInitialized.value) {
      return;
    }

    locale.value =
      normalizeLocale(window.localStorage.getItem(storageKey)) ??
      getLocaleFromNavigator() ??
      'en';
    isInitialized.value = true;
  });

  return {
    content,
    locale,
    setLocale,
  };
};
