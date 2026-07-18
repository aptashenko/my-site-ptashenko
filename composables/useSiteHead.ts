export const useSiteHead = () => {
  const { content, locale } = useSiteLocale();

  useHead(() => ({
    htmlAttrs: {
      lang: locale.value,
    },
    title: content.value.meta.title,
    meta: [
      {
        name: 'description',
        content: content.value.meta.description,
      },
    ],
  }));
};
