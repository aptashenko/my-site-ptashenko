export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  experimental: {
    appManifest: false,
  },
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    adminLogin: 'admin',
    adminPassword: 'Aptashenko93',
    adminSessionSecret: 'ptashenko-admin-session',
  },
  app: {
    head: {
      title: 'Ptashenko - SaaS, chatbots, automation, and web products',
      meta: [
        {
          name: 'description',
          content:
            'I build web products, chatbots, automations, and SaaS from scratch with Vue.js, Nuxt.js, and Node.js.',
        },
      ],
    },
  },
});
