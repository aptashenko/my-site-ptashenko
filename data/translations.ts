import type { Locale, SiteTranslations } from '~/types/i18n';

export const supportedLocales: Locale[] = ['en', 'ru', 'uk'];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  uk: 'UK',
};

export const translations = {
  en: {
    meta: {
      title: 'Ptashenko - SaaS, chatbots, automation, and web products',
      description:
        'I build web products, chatbots, automations, and SaaS from scratch with Vue.js, Nuxt.js, and Node.js.',
    },
    header: {
      aria: 'Main navigation',
      sectionsAria: 'Site sections',
      services: 'Services',
      pricing: 'Pricing',
      cases: 'Cases',
      process: 'Process',
      reviews: 'Reviews',
      contacts: 'Contacts',
      write: 'Write',
      languageAria: 'Choose language',
    },
    hero: {
      availability: 'Available for new projects',
      eyebrow: 'Vue, Nuxt, Node - product development',
      title: 'I build web products, chatbots, automations, and SaaS from scratch.',
      copy:
        'I work as an independent specialist across product structure, frontend, backend, integrations, and launch. The project feels like a small technical team is behind it, even when we start with one person.',
      actionsAria: 'Primary actions',
      discuss: 'Discuss a project',
      works: 'View work',
      factsAria: 'Work facts',
      facts: [
        ['Focus', 'SaaS, chatbots, automation'],
        ['Stack', 'Vue.js, Nuxt.js, Node.js'],
        ['Format', 'from idea to launch'],
      ],
    },
    services: {
      kicker: 'Services',
      title: 'What you can bring',
      items: [
        {
          icon: 'product',
          title: 'Launch a product',
          description:
            'MVPs, dashboards, admin panels, auth, roles, payments, and first release.',
        },
        {
          icon: 'chatbot',
          title: 'Build a chatbot',
          description:
            'Telegram bots, lead intake, support flows, notifications, and CRM integrations.',
        },
        {
          icon: 'automation',
          title: 'Automate a process',
          description:
            'Requests, documents, CRM workflows, service integrations, and internal tools.',
        },
        {
          icon: 'frontend',
          title: 'Strengthen frontend',
          description:
            'Vue.js and Nuxt.js interfaces, SSR pages, dashboards, and product UI.',
        },
      ],
    },
    cases: {
      kicker: 'Cases',
      title: 'Selected product work',
      description:
        'Support, feature development, automation, sales funnels, and subscription products built around real business workflows.',
      resultLabel: 'Result',
      stackLabel: 'Technology stack',
      projectLinkLabel: 'View project',
      projectLinkPlaceholder: 'Project link',
      openPreviewLabel: 'Open case',
      closePreviewLabel: 'Close case',
      previousLabel: 'Previous cases',
      nextLabel: 'Next cases',
    },
    process: {
      kicker: 'Process',
      title: 'How the work is structured',
      intro:
        'A clear path from business idea to product, automation, bot, or supported feature release.',
      steps: [
        {
          title: 'Understand the task',
          description:
            'I clarify the business goal, users, current process, constraints, and the first useful version.',
        },
        {
          title: 'Shape the first scope',
          description:
            'We define features, integrations, priorities, technical approach, and what should wait.',
        },
        {
          title: 'Design scenarios',
          description:
            'I map screens, bot flows, automation logic, payment states, or user journeys before building.',
        },
        {
          title: 'Build the product',
          description:
            'Frontend, backend, APIs, payments, Telegram, CRM, Google Sheets, dashboards, and admin tools.',
        },
        {
          title: 'Launch and support',
          description:
            'Deployment, scenario checks, fixes, monitoring, support, and new feature iterations.',
        },
      ],
    },
    reviews: {
      kicker: 'Reviews',
      title: 'What people say after the work',
      description:
        'Short notes from clients and collaborators.',
      empty: 'Reviews will appear here.',
      openForm: 'Leave a review',
      modalTitle: 'Leave a review',
      modalDescription:
        'Write a short review about the project or collaboration.',
      closeModal: 'Close review form',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        roleLabel: 'Role or project',
        rolePlaceholder: 'Founder, product owner, project name',
        linkLabel: 'Profile or project link',
        linkPlaceholder: 'https://example.com',
        textLabel: 'Review',
        textPlaceholder: 'What was useful, clear, or valuable in the work?',
        submit: 'Send for moderation',
        sending: 'Sending...',
        success: 'Thank you. The review will appear after moderation.',
        error: 'Could not send the review. Please try again.',
      },
    },
    contacts: {
      kicker: 'Contacts',
      title: 'Have a task or idea?',
      copy:
        'Tell me what you want to launch, automate, or improve. I will reply with a clear next step.',
      responseTime: 'I usually reply within one business day.',
      photoAlt: 'Portrait photo placeholder',
      openForm: 'Describe a project',
      modalTitle: 'Project request',
      modalDescription:
        'Send the first details. The request will go directly to Telegram.',
      closeModal: 'Close form',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        contactLabel: 'Contact',
        contactPlaceholder: 'Email, Telegram, or phone',
        typeLabel: 'Project type',
        typePlaceholder: 'SaaS, bot, automation, frontend...',
        messageLabel: 'Message',
        messagePlaceholder:
          'Briefly describe the goal, current stage, integrations, and timeline.',
        submit: 'Send to Telegram',
        sending: 'Sending...',
        success: 'Sent. I will get back to you soon.',
        error: 'Could not send. Please use email instead.',
      },
      checklistTitle: 'Helpful to include',
      checklist: [
        'Task type: SaaS, bot, automation, frontend',
        'Current stage: idea, MVP, support, new feature',
        'Integrations: CRM, Google Sheets, Stripe, Telegram',
        'Timeline or deadline',
      ],
    },
  },
  ru: {
    meta: {
      title: 'Ptashenko - SaaS, чат-боты, автоматизации и веб-продукты',
      description:
        'Разрабатываю веб-продукты, чат-боты, автоматизации и SaaS с нуля на Vue.js, Nuxt.js и Node.js.',
    },
    header: {
      aria: 'Главная навигация',
      sectionsAria: 'Разделы сайта',
      services: 'Услуги',
      pricing: 'Стоимость',
      cases: 'Кейсы',
      process: 'Процесс',
      reviews: 'Отзывы',
      contacts: 'Контакты',
      write: 'Написать',
      languageAria: 'Выбор языка',
    },
    hero: {
      availability: 'Открыт к новым проектам',
      eyebrow: 'Vue, Nuxt, Node - продуктовая разработка',
      title: 'Делаю веб-продукты, чат-боты, автоматизации и SaaS с нуля.',
      copy:
        'Работаю как независимый специалист: продумываю структуру продукта, frontend, backend, интеграции и запуск. Проект ощущается как работа небольшой технической команды, даже если стартуем с одного человека.',
      actionsAria: 'Основные действия',
      discuss: 'Обсудить проект',
      works: 'Смотреть работы',
      factsAria: 'Коротко о работе',
      facts: [
        ['Фокус', 'SaaS, чат-боты, автоматизации'],
        ['Стек', 'Vue.js, Nuxt.js, Node.js'],
        ['Формат', 'от идеи до запуска'],
      ],
    },
    services: {
      kicker: 'Услуги',
      title: 'С чем можно прийти',
      items: [
        {
          icon: 'product',
          title: 'Запустить продукт',
          description:
            'MVP, кабинеты, админки, авторизация, роли, платежи и первая версия.',
        },
        {
          icon: 'chatbot',
          title: 'Сделать чат-бота',
          description:
            'Telegram-боты, прием заявок, поддержка, уведомления и интеграции с CRM.',
        },
        {
          icon: 'automation',
          title: 'Автоматизировать процесс',
          description:
            'Заявки, документы, CRM-сценарии, связки сервисов и внутренние инструменты.',
        },
        {
          icon: 'frontend',
          title: 'Усилить frontend',
          description:
            'Интерфейсы на Vue.js и Nuxt.js, SSR-страницы, дашборды и продуктовый UI.',
        },
      ],
    },
    cases: {
      kicker: 'Кейсы',
      title: 'Избранные проекты',
      description:
        'Поддержка, разработка новых функций, автоматизации, воронки продаж и подписочные продукты вокруг реальных бизнес-процессов.',
      resultLabel: 'Результат',
      stackLabel: 'Стек технологий',
      projectLinkLabel: 'Смотреть проект',
      projectLinkPlaceholder: 'Ссылка на проект',
      openPreviewLabel: 'Открыть кейс',
      closePreviewLabel: 'Закрыть кейс',
      previousLabel: 'Предыдущие кейсы',
      nextLabel: 'Следующие кейсы',
    },
    process: {
      kicker: 'Процесс',
      title: 'Как строится работа',
      intro:
        'Понятный путь от бизнес-идеи до продукта, автоматизации, бота или поддерживаемого релиза фичи.',
      steps: [
        {
          title: 'Разбираю задачу',
          description:
            'Уточняю бизнес-цель, пользователей, текущий процесс, ограничения и первую полезную версию.',
        },
        {
          title: 'Собираю план первой версии',
          description:
            'Фиксируем функции, интеграции, приоритеты, технический подход и то, что лучше отложить.',
        },
        {
          title: 'Проектирую сценарии',
          description:
            'Описываю экраны, сценарии бота, логику автоматизаций, состояния платежей или пользовательские пути.',
        },
        {
          title: 'Разрабатываю продукт',
          description:
            'Frontend, backend, API, платежи, Telegram, CRM, Google Sheets, dashboards и админские инструменты.',
        },
        {
          title: 'Запускаю и поддерживаю',
          description:
            'Деплой, проверка сценариев, исправления, мониторинг, поддержка и итерации новых фичей.',
        },
      ],
    },
    reviews: {
      kicker: 'Отзывы',
      title: 'Что говорят после работы',
      description:
        'Короткие отзывы клиентов и партнёров.',
      empty: 'Отзывы появятся здесь.',
      openForm: 'Оставить отзыв',
      modalTitle: 'Оставить отзыв',
      modalDescription:
        'Напишите короткий отзыв о проекте или сотрудничестве.',
      closeModal: 'Закрыть форму отзыва',
      form: {
        nameLabel: 'Имя',
        namePlaceholder: 'Ваше имя',
        roleLabel: 'Роль или проект',
        rolePlaceholder: 'Founder, product owner, название проекта',
        linkLabel: 'Ссылка на профиль или проект',
        linkPlaceholder: 'https://example.com',
        textLabel: 'Отзыв',
        textPlaceholder: 'Что было полезным, понятным или ценным в работе?',
        submit: 'Отправить на модерацию',
        sending: 'Отправляю...',
        success: 'Спасибо. Отзыв появится после модерации.',
        error: 'Не удалось отправить отзыв. Попробуйте ещё раз.',
      },
    },
    contacts: {
      kicker: 'Контакты',
      title: 'Есть задача или идея?',
      copy:
        'Расскажите, что хотите запустить, автоматизировать или улучшить. Я отвечу с понятным следующим шагом.',
      responseTime: 'Обычно отвечаю в течение 1 рабочего дня.',
      photoAlt: 'Квадратное фото-плейсхолдер',
      openForm: 'Описать проект',
      modalTitle: 'Заявка на проект',
      modalDescription:
        'Отправьте первые детали. Заявка придет напрямую в Telegram.',
      closeModal: 'Закрыть форму',
      form: {
        nameLabel: 'Имя',
        namePlaceholder: 'Ваше имя',
        contactLabel: 'Контакт',
        contactPlaceholder: 'Email, Telegram или телефон',
        typeLabel: 'Тип проекта',
        typePlaceholder: 'SaaS, бот, автоматизация, frontend...',
        messageLabel: 'Сообщение',
        messagePlaceholder:
          'Коротко опишите цель, текущий этап, интеграции и сроки.',
        submit: 'Отправить в Telegram',
        sending: 'Отправляю...',
        success: 'Отправлено. Я скоро отвечу.',
        error: 'Не удалось отправить. Напишите на email.',
      },
      checklistTitle: 'Что полезно указать',
      checklist: [
        'Тип задачи: SaaS, бот, автоматизация, frontend',
        'Этап: идея, MVP, поддержка, новая фича',
        'Интеграции: CRM, Google Sheets, Stripe, Telegram',
        'Сроки или дедлайн',
      ],
    },
  },
  uk: {
    meta: {
      title: 'Ptashenko - SaaS, чат-боти, автоматизації та веб-продукти',
      description:
        'Розробляю веб-продукти, чат-боти, автоматизації та SaaS з нуля на Vue.js, Nuxt.js і Node.js.',
    },
    header: {
      aria: 'Головна навігація',
      sectionsAria: 'Розділи сайту',
      services: 'Послуги',
      pricing: 'Вартість',
      cases: 'Кейси',
      process: 'Процес',
      reviews: 'Відгуки',
      contacts: 'Контакти',
      write: 'Написати',
      languageAria: 'Вибір мови',
    },
    hero: {
      availability: 'Відкритий до нових проєктів',
      eyebrow: 'Vue, Nuxt, Node - продуктова розробка',
      title: 'Роблю веб-продукти, чат-боти, автоматизації та SaaS з нуля.',
      copy:
        'Працюю як незалежний спеціаліст: продумую структуру продукту, frontend, backend, інтеграції та запуск. Проєкт відчувається як робота невеликої технічної команди, навіть якщо стартуємо з однієї людини.',
      actionsAria: 'Основні дії',
      discuss: 'Обговорити проєкт',
      works: 'Дивитися роботи',
      factsAria: 'Коротко про роботу',
      facts: [
        ['Фокус', 'SaaS, чат-боти, автоматизації'],
        ['Стек', 'Vue.js, Nuxt.js, Node.js'],
        ['Формат', 'від ідеї до запуску'],
      ],
    },
    services: {
      kicker: 'Послуги',
      title: 'З чим можна звернутися',
      items: [
        {
          icon: 'product',
          title: 'Запустити продукт',
          description:
            'MVP, кабінети, адмінки, авторизація, ролі, платежі та перша версія.',
        },
        {
          icon: 'chatbot',
          title: 'Зробити чат-бота',
          description:
            'Telegram-боти, прийом заявок, підтримка, сповіщення та інтеграції з CRM.',
        },
        {
          icon: 'automation',
          title: 'Автоматизувати процес',
          description:
            'Заявки, документи, CRM-сценарії, звʼязки сервісів і внутрішні інструменти.',
        },
        {
          icon: 'frontend',
          title: 'Посилити frontend',
          description:
            'Інтерфейси на Vue.js і Nuxt.js, SSR-сторінки, дашборди та продуктовий UI.',
        },
      ],
    },
    cases: {
      kicker: 'Кейси',
      title: 'Вибрані проєкти',
      description:
        'Підтримка, розробка нових функцій, автоматизації, воронки продажів і підписні продукти навколо реальних бізнес-процесів.',
      resultLabel: 'Результат',
      stackLabel: 'Стек технологій',
      projectLinkLabel: 'Дивитися проєкт',
      projectLinkPlaceholder: 'Посилання на проєкт',
      openPreviewLabel: 'Відкрити кейс',
      closePreviewLabel: 'Закрити кейс',
      previousLabel: 'Попередні кейси',
      nextLabel: 'Наступні кейси',
    },
    process: {
      kicker: 'Процес',
      title: 'Як будується робота',
      intro:
        'Зрозумілий шлях від бізнес-ідеї до продукту, автоматизації, бота або підтримуваного релізу фічі.',
      steps: [
        {
          title: 'Розбираю задачу',
          description:
            'Уточнюю бізнес-ціль, користувачів, поточний процес, обмеження та першу корисну версію.',
        },
        {
          title: 'Збираю план першої версії',
          description:
            'Фіксуємо функції, інтеграції, пріоритети, технічний підхід і те, що краще відкласти.',
        },
        {
          title: 'Проєктую сценарії',
          description:
            'Описую екрани, сценарії бота, логіку автоматизацій, стани платежів або користувацькі шляхи.',
        },
        {
          title: 'Розробляю продукт',
          description:
            'Frontend, backend, API, платежі, Telegram, CRM, Google Sheets, dashboards і адмінські інструменти.',
        },
        {
          title: 'Запускаю і підтримую',
          description:
            'Деплой, перевірка сценаріїв, виправлення, моніторинг, підтримка та ітерації нових фіч.',
        },
      ],
    },
    reviews: {
      kicker: 'Відгуки',
      title: 'Що кажуть після роботи',
      description:
        'Короткі відгуки клієнтів і партнерів.',
      empty: 'Відгуки зʼявляться тут.',
      openForm: 'Залишити відгук',
      modalTitle: 'Залишити відгук',
      modalDescription:
        'Напишіть короткий відгук про проєкт або співпрацю.',
      closeModal: 'Закрити форму відгуку',
      form: {
        nameLabel: 'Імʼя',
        namePlaceholder: 'Ваше імʼя',
        roleLabel: 'Роль або проєкт',
        rolePlaceholder: 'Founder, product owner, назва проєкту',
        linkLabel: 'Посилання на профіль або проєкт',
        linkPlaceholder: 'https://example.com',
        textLabel: 'Відгук',
        textPlaceholder: 'Що було корисним, зрозумілим або цінним у роботі?',
        submit: 'Надіслати на модерацію',
        sending: 'Надсилаю...',
        success: 'Дякую. Відгук зʼявиться після модерації.',
        error: 'Не вдалося надіслати відгук. Спробуйте ще раз.',
      },
    },
    contacts: {
      kicker: 'Контакти',
      title: 'Є задача або ідея?',
      copy:
        'Розкажіть, що хочете запустити, автоматизувати або покращити. Я відповім із зрозумілим наступним кроком.',
      responseTime: 'Зазвичай відповідаю протягом 1 робочого дня.',
      photoAlt: 'Квадратне фото-плейсхолдер',
      openForm: 'Описати проєкт',
      modalTitle: 'Заявка на проєкт',
      modalDescription:
        'Надішліть перші деталі. Заявка прийде напряму в Telegram.',
      closeModal: 'Закрити форму',
      form: {
        nameLabel: 'Імʼя',
        namePlaceholder: 'Ваше імʼя',
        contactLabel: 'Контакт',
        contactPlaceholder: 'Email, Telegram або телефон',
        typeLabel: 'Тип проєкту',
        typePlaceholder: 'SaaS, бот, автоматизація, frontend...',
        messageLabel: 'Повідомлення',
        messagePlaceholder:
          'Коротко опишіть ціль, поточний етап, інтеграції та строки.',
        submit: 'Надіслати в Telegram',
        sending: 'Надсилаю...',
        success: 'Надіслано. Я скоро відповім.',
        error: 'Не вдалося надіслати. Напишіть на email.',
      },
      checklistTitle: 'Що корисно вказати',
      checklist: [
        'Тип задачі: SaaS, бот, автоматизація, frontend',
        'Етап: ідея, MVP, підтримка, нова фіча',
        'Інтеграції: CRM, Google Sheets, Stripe, Telegram',
        'Строки або дедлайн',
      ],
    },
  },
} satisfies Record<Locale, SiteTranslations>;
