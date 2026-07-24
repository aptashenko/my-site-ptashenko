import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type {
  Locale,
  PricingRecord,
  PricingSection,
  PricingSectionTranslation,
  PricingTierRecord,
  PricingTierTranslation,
} from '~/types/i18n';

const pricingFilePath = join(process.cwd(), 'server/data/pricing.json');
const supportedLocales: Locale[] = ['en', 'ru', 'uk'];

const sanitizeText = (value: unknown, maxLength = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const sanitizeList = (value: unknown, maxItems = 30, maxLength = 220) =>
  Array.isArray(value)
    ? value
        .map((item) => sanitizeText(item, maxLength))
        .filter(Boolean)
        .slice(0, maxItems)
    : [];

const baseRu: PricingSectionTranslation = {
  kicker: 'Стоимость',
  title: 'Ориентировочная стоимость ботов и CRM-систем',
  intro:
    'Цена зависит от сложности логики, интеграций, ролей пользователей и объема автоматизации. Ниже - ориентиры по типовым проектам.',
  detailsLabel: 'Что может входить',
  suitableLabel: 'Подходит',
  actionLabel: 'Обсудить проект',
  factorsTitle: 'Что влияет на стоимость',
  factorsIntro:
    'Стоимость зависит не только от количества экранов, но и от сложности бизнес-процессов.',
  factors: [
    'Роли пользователей',
    'Этапы воронки',
    'Онлайн-оплата',
    'Интеграции',
    'Личный кабинет',
    'Документы',
    'Аналитика и отчеты',
    'Импорт данных',
    'Безопасность',
    'Мобильная версия',
    'Техническая поддержка',
  ],
  example: {
    title: 'Пример автоматизации',
    beforeTitle: 'До внедрения',
    beforeText:
      'Клиенты пишут в WhatsApp, менеджеры вручную переносят заказы в Google Таблицы, отдельно считают оплаты, долги и остатки. Информация может теряться, а руководителю сложно получить точную аналитику.',
    afterTitle: 'После внедрения',
    afterText:
      'Заявка автоматически попадает в CRM, создается карточка клиента и заказ. Менеджер видит историю общения, оплату и задолженность. Руководитель видит продажи, долги и эффективность менеджеров в одном месте.',
  },
};

const translateSection = (locale: Locale): PricingSectionTranslation => {
  if (locale === 'ru') {
    return baseRu;
  }

  if (locale === 'uk') {
    return {
      ...baseRu,
      kicker: 'Вартість',
      title: 'Орієнтовна вартість ботів і CRM-систем',
      intro:
        'Ціна залежить від складності логіки, інтеграцій, ролей користувачів та обсягу автоматизації. Нижче - орієнтири для типових проєктів.',
      detailsLabel: 'Що може входити',
      suitableLabel: 'Підходить',
      actionLabel: 'Обговорити проєкт',
      factorsTitle: 'Що впливає на вартість',
      factorsIntro:
        'Вартість залежить не лише від кількості екранів, а й від складності бізнес-процесів.',
      factors: [
        'Ролі користувачів',
        'Етапи воронки',
        'Онлайн-оплата',
        'Інтеграції',
        'Особистий кабінет',
        'Документи',
        'Аналітика і звіти',
        'Імпорт даних',
        'Безпека',
        'Мобільна версія',
        'Технічна підтримка',
      ],
      example: {
        title: 'Приклад автоматизації',
        beforeTitle: 'До впровадження',
        beforeText:
          'Клієнти пишуть у WhatsApp, менеджери вручну переносять замовлення в Google Таблиці, окремо рахують оплати, борги та залишки. Інформація може губитися, а керівнику складно отримати точну аналітику.',
        afterTitle: 'Після впровадження',
        afterText:
          'Заявка автоматично потрапляє в CRM, створюється картка клієнта і замовлення. Менеджер бачить історію спілкування, оплату і заборгованість. Керівник бачить продажі, борги та ефективність менеджерів в одному місці.',
      },
    };
  }

  return {
    kicker: 'Pricing',
    title: 'Estimated cost of bot and CRM development',
    intro:
      'The price depends on logic complexity, integrations, user roles, and automation scope. These are practical ranges for typical projects.',
    detailsLabel: 'What can be included',
    suitableLabel: 'Best for',
    actionLabel: 'Discuss a project',
    factorsTitle: 'What affects the cost',
    factorsIntro:
      'Cost depends on business logic and process complexity, not only on the number of screens.',
    factors: [
      'User roles',
      'Pipeline stages',
      'Online payments',
      'Integrations',
      'Personal account',
      'Documents',
      'Analytics and reports',
      'Data import',
      'Security',
      'Mobile version',
      'Technical support',
    ],
    example: {
      title: 'Automation example',
      beforeTitle: 'Before',
      beforeText:
        'Clients write in WhatsApp, managers copy orders into Google Sheets manually, and payments, debt, and stock are tracked separately. Information can get lost and analytics are hard to trust.',
      afterTitle: 'After',
      afterText:
        'The request enters the CRM automatically, a customer profile and order are created, managers see communication history and payment status, and leadership sees sales, debt, and team performance in one place.',
    },
  };
};

const tier = (
  id: string,
  price: string,
  category: string,
  highlighted: boolean,
  ru: PricingTierTranslation,
  en: PricingTierTranslation,
  uk: PricingTierTranslation,
): PricingTierRecord => ({
  id,
  price,
  category,
  highlighted,
  content: { en, ru, uk },
});

export const defaultPricingRecord: PricingRecord = {
  content: {
    en: translateSection('en'),
    ru: translateSection('ru'),
    uk: translateSection('uk'),
  },
  tiers: [
    tier(
      'simple-bot',
      '$100-250',
      'Bots',
      false,
      {
        name: 'Простой бот',
        description: 'Небольшой Telegram-бот с несколькими командами или кнопками.',
        suitableFor: 'Тестирование идеи или автоматизация одного простого действия.',
        features: [
          'Информация о компании',
          'Контакты и FAQ',
          'Простая заявка',
          'Сохранение в Google Таблицу',
          'Уведомление администратору',
        ],
      },
      {
        name: 'Simple bot',
        description: 'A small Telegram bot with several commands or buttons.',
        suitableFor: 'Testing an idea or automating one simple action.',
        features: [
          'Company information',
          'Contacts and FAQ',
          'Simple request form',
          'Google Sheets saving',
          'Admin notification',
        ],
      },
      {
        name: 'Простий бот',
        description: 'Невеликий Telegram-бот з кількома командами або кнопками.',
        suitableFor: 'Тестування ідеї або автоматизація однієї простої дії.',
        features: [
          'Інформація про компанію',
          'Контакти та FAQ',
          'Проста заявка',
          'Збереження в Google Таблицю',
          'Сповіщення адміністратору',
        ],
      },
    ),
    tier(
      'lead-bot',
      '$250-500',
      'Bots',
      false,
      {
        name: 'Бот для сбора заявок',
        description:
          'Бот проводит клиента по сценарию, собирает контактные данные и передает заявку менеджеру.',
        suitableFor: 'Малый бизнес, консультации, онлайн-школы, мастера и сервисные компании.',
        features: [
          'Выбор услуги или товара',
          'Небольшая анкета',
          'Сбор имени, телефона и email',
          'Примерный расчет стоимости',
          'Уведомление менеджеру',
          'Простая фильтрация клиентов',
        ],
      },
      {
        name: 'Lead intake bot',
        description:
          'A bot guides the client through a configured scenario, collects contacts, and sends the request to a manager.',
        suitableFor: 'Small businesses, consultants, online schools, specialists, and service teams.',
        features: [
          'Service or product choice',
          'Short questionnaire',
          'Name, phone, and email collection',
          'Estimated price calculation',
          'Manager notification',
          'Simple lead filtering',
        ],
      },
      {
        name: 'Бот для збору заявок',
        description:
          'Бот проводить клієнта сценарієм, збирає контактні дані та передає заявку менеджеру.',
        suitableFor: 'Малий бізнес, консультації, онлайн-школи, майстри та сервісні компанії.',
        features: [
          'Вибір послуги або товару',
          'Коротка анкета',
          'Збір імені, телефона та email',
          'Орієнтовний розрахунок вартості',
          'Сповіщення менеджеру',
          'Проста фільтрація клієнтів',
        ],
      },
    ),
    tier(
      'payment-bot',
      '$500-900',
      'Bots',
      true,
      {
        name: 'Бот с оплатой и уведомлениями',
        description: 'Бот помогает клиенту оформить заказ или оплатить услугу.',
        suitableFor: 'Курсы, подписки, билеты, консультации и цифровые продукты.',
        features: [
          'Каталог товаров или услуг',
          'Корзина',
          'Онлайн-оплата',
          'Проверка статуса платежа',
          'Выдача ссылки, файла или доступа',
          'Отчеты в Excel',
        ],
      },
      {
        name: 'Bot with payments and notifications',
        description: 'A bot helps the client place an order or pay for a service.',
        suitableFor: 'Courses, subscriptions, tickets, consultations, and digital products.',
        features: [
          'Product or service catalog',
          'Cart',
          'Online payment',
          'Payment status check',
          'Link, file, or access delivery',
          'Excel reports',
        ],
      },
      {
        name: 'Бот з оплатою і сповіщеннями',
        description: 'Бот допомагає клієнту оформити замовлення або оплатити послугу.',
        suitableFor: 'Курси, підписки, квитки, консультації та цифрові продукти.',
        features: [
          'Каталог товарів або послуг',
          'Кошик',
          'Онлайн-оплата',
          'Перевірка статусу платежу',
          'Видача посилання, файла або доступу',
          'Звіти в Excel',
        ],
      },
    ),
    tier(
      'crm-logic',
      '$900-1800',
      'CRM',
      false,
      {
        name: 'Бот с личным кабинетом и CRM-логикой',
        description: 'Система хранит историю работы с каждым клиентом.',
        suitableFor: 'Компании, которым уже недостаточно Google Таблиц.',
        features: [
          'Карточка клиента',
          'История заявок и заказов',
          'Статусы клиента',
          'Комментарии менеджеров',
          'Повторные продажи',
          'Роли администратора и менеджера',
        ],
      },
      {
        name: 'Bot with account area and CRM logic',
        description: 'A system stores the history of work with every client.',
        suitableFor: 'Companies that have outgrown Google Sheets.',
        features: [
          'Customer profile',
          'Request and order history',
          'Customer statuses',
          'Manager comments',
          'Repeat sales',
          'Admin and manager roles',
        ],
      },
      {
        name: 'Бот з кабінетом і CRM-логікою',
        description: 'Система зберігає історію роботи з кожним клієнтом.',
        suitableFor: 'Компанії, яким вже недостатньо Google Таблиць.',
        features: [
          'Картка клієнта',
          'Історія заявок і замовлень',
          'Статуси клієнта',
          'Коментарі менеджерів',
          'Повторні продажі',
          'Ролі адміністратора і менеджера',
        ],
      },
    ),
    tier(
      'department-crm',
      '$1800-3500',
      'CRM',
      false,
      {
        name: 'CRM-система для одного отдела',
        description: 'Веб-система, в которой сотрудники полноценно работают с клиентами и продажами.',
        suitableFor: 'Отдел продаж, онлайн-школа, агентство, оптовая компания или сервисный бизнес.',
        features: [
          'База и карточки клиентов',
          'Воронка продаж',
          'Сделки, статусы и задачи',
          'Учет оплат и задолженности',
          'Фильтры и поиск',
          'Импорт и экспорт Excel',
        ],
      },
      {
        name: 'CRM for one department',
        description: 'A web system where employees manage customers and sales end to end.',
        suitableFor: 'Sales teams, online schools, agencies, wholesale, and service businesses.',
        features: [
          'Customer database and profiles',
          'Sales pipeline',
          'Deals, statuses, and tasks',
          'Payments and debt tracking',
          'Filters and search',
          'Excel import and export',
        ],
      },
      {
        name: 'CRM-система для одного відділу',
        description: 'Веб-система, де співробітники повноцінно працюють з клієнтами і продажами.',
        suitableFor: 'Відділ продажів, онлайн-школа, агентство, оптова компанія або сервісний бізнес.',
        features: [
          'База і картки клієнтів',
          'Воронка продажів',
          'Угоди, статуси і задачі',
          'Облік оплат і заборгованості',
          'Фільтри і пошук',
          'Імпорт і експорт Excel',
        ],
      },
    ),
    tier(
      'business-automation',
      '$3500-6000',
      'Automation',
      false,
      {
        name: 'CRM и автоматизация нескольких процессов',
        description: 'Система объединяет работу нескольких отделов и основные бизнес-процессы.',
        suitableFor: 'Компании, которые хотят отказаться от ручного учета и разрозненных таблиц.',
        features: [
          'Продажи, клиенты и заказы',
          'Оплаты и задолженность',
          'Склад или остатки',
          'Поставщики и документы',
          'Задачи сотрудников',
          'Распределение заявок',
        ],
      },
      {
        name: 'CRM and multi-process automation',
        description: 'A system connects several departments and automates core workflows.',
        suitableFor: 'Companies moving away from manual tracking and disconnected spreadsheets.',
        features: [
          'Sales, customers, and orders',
          'Payments and debt',
          'Stock or inventory',
          'Suppliers and documents',
          'Employee tasks',
          'Lead distribution',
        ],
      },
      {
        name: 'CRM і автоматизація кількох процесів',
        description: 'Система обʼєднує роботу кількох відділів та основні бізнес-процеси.',
        suitableFor: 'Компанії, які хочуть відмовитися від ручного обліку і розрізнених таблиць.',
        features: [
          'Продажі, клієнти і замовлення',
          'Оплати і заборгованість',
          'Склад або залишки',
          'Постачальники і документи',
          'Задачі співробітників',
          'Розподіл заявок',
        ],
      },
    ),
    tier(
      'business-platform',
      '$6000-12000',
      'Platform',
      false,
      {
        name: 'Полноценная бизнес-платформа',
        description: 'Индивидуальная CRM-система под процессы конкретной компании.',
        suitableFor: 'Компании, которым не подходят готовые CRM из-за специфических процессов.',
        features: [
          'Несколько отделов',
          'Сложные роли доступа',
          'Финансы, долги и склад',
          'Бизнес-сценарии',
          'Аналитические дашборды',
          'API и резервное копирование',
        ],
      },
      {
        name: 'Full business platform',
        description: 'A custom CRM system tailored to the company processes.',
        suitableFor: 'Companies whose specific workflows do not fit off-the-shelf CRMs.',
        features: [
          'Several departments',
          'Advanced access roles',
          'Finance, debt, and inventory',
          'Business scenarios',
          'Analytics dashboards',
          'API and backups',
        ],
      },
      {
        name: 'Повноцінна бізнес-платформа',
        description: 'Індивідуальна CRM-система під процеси конкретної компанії.',
        suitableFor: 'Компанії, яким не підходять готові CRM через специфічні процеси.',
        features: [
          'Кілька відділів',
          'Складні ролі доступу',
          'Фінанси, борги і склад',
          'Бізнес-сценарії',
          'Аналітичні дашборди',
          'API і резервне копіювання',
        ],
      },
    ),
    tier(
      'enterprise',
      '$12000+',
      'Enterprise',
      false,
      {
        name: 'Enterprise-система',
        description: 'Корпоративная система для большого количества пользователей, клиентов и операций.',
        suitableFor: 'Проектируется индивидуально после анализа процессов компании.',
        features: [
          'Высокая нагрузка',
          'Филиалы или несколько компаний',
          'Сложная отчетность',
          'ERP, бухгалтерия и банки',
          'Мобильное приложение',
          'Мониторинг и повышенная безопасность',
        ],
      },
      {
        name: 'Enterprise system',
        description: 'A corporate system for many users, customers, and operations.',
        suitableFor: 'Designed individually after analyzing company processes.',
        features: [
          'High load',
          'Branches or multiple companies',
          'Complex reporting',
          'ERP, accounting, and bank integrations',
          'Mobile app',
          'Monitoring and advanced security',
        ],
      },
      {
        name: 'Enterprise-система',
        description: 'Корпоративна система для великої кількості користувачів, клієнтів і операцій.',
        suitableFor: 'Проєктується індивідуально після аналізу процесів компанії.',
        features: [
          'Високе навантаження',
          'Філії або кілька компаній',
          'Складна звітність',
          'ERP, бухгалтерія і банки',
          'Мобільний застосунок',
          'Моніторинг і підвищена безпека',
        ],
      },
    ),
  ],
};

const normalizeTierTranslation = (
  value: Partial<PricingTierTranslation> | undefined,
  fallback: PricingTierTranslation,
): PricingTierTranslation => ({
  name: sanitizeText(value?.name, 180) || fallback.name,
  description: sanitizeText(value?.description, 800) || fallback.description,
  suitableFor: sanitizeText(value?.suitableFor, 600) || fallback.suitableFor,
  features: sanitizeList(value?.features, 12, 180).length
    ? sanitizeList(value?.features, 12, 180)
    : fallback.features,
});

const normalizeSectionTranslation = (
  value: Partial<PricingSectionTranslation> | undefined,
  fallback: PricingSectionTranslation,
): PricingSectionTranslation => ({
  kicker: sanitizeText(value?.kicker, 80) || fallback.kicker,
  title: sanitizeText(value?.title, 220) || fallback.title,
  intro: sanitizeText(value?.intro, 800) || fallback.intro,
  detailsLabel: sanitizeText(value?.detailsLabel, 80) || fallback.detailsLabel,
  suitableLabel: sanitizeText(value?.suitableLabel, 80) || fallback.suitableLabel,
  actionLabel: sanitizeText(value?.actionLabel, 80) || fallback.actionLabel,
  factorsTitle: sanitizeText(value?.factorsTitle, 180) || fallback.factorsTitle,
  factorsIntro: sanitizeText(value?.factorsIntro, 800) || fallback.factorsIntro,
  factors: sanitizeList(value?.factors, 24, 120).length
    ? sanitizeList(value?.factors, 24, 120)
    : fallback.factors,
  example: {
    title: sanitizeText(value?.example?.title, 180) || fallback.example.title,
    beforeTitle: sanitizeText(value?.example?.beforeTitle, 80) || fallback.example.beforeTitle,
    beforeText: sanitizeText(value?.example?.beforeText, 1000) || fallback.example.beforeText,
    afterTitle: sanitizeText(value?.example?.afterTitle, 80) || fallback.example.afterTitle,
    afterText: sanitizeText(value?.example?.afterText, 1000) || fallback.example.afterText,
  },
});

export const normalizePricingRecord = (value: unknown): PricingRecord => {
  const input = (value && typeof value === 'object' ? value : {}) as Partial<PricingRecord>;

  const content = supportedLocales.reduce(
    (acc, locale) => {
      acc[locale] = normalizeSectionTranslation(
        input.content?.[locale],
        defaultPricingRecord.content[locale],
      );
      return acc;
    },
    {} as PricingRecord['content'],
  );

  const sourceTiers = Array.isArray(input.tiers) && input.tiers.length
    ? input.tiers
    : defaultPricingRecord.tiers;

  const tiers = sourceTiers
    .map((item, index): PricingTierRecord => {
      const fallback = defaultPricingRecord.tiers[index] ?? defaultPricingRecord.tiers[0];
      const rawId = sanitizeText(item?.id, 100)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const id = rawId || fallback.id || `pricing-${index + 1}`;

      return {
        id,
        price: sanitizeText(item?.price, 80) || fallback.price,
        category: sanitizeText(item?.category, 80) || fallback.category,
        highlighted: Boolean(item?.highlighted),
        content: supportedLocales.reduce(
          (acc, locale) => {
            acc[locale] = normalizeTierTranslation(item?.content?.[locale], fallback.content[locale]);
            return acc;
          },
          {} as PricingTierRecord['content'],
        ),
      };
    })
    .slice(0, 12);

  return { content, tiers };
};

export const readPricingRecord = async (): Promise<PricingRecord> => {
  try {
    const raw = await readFile(pricingFilePath, 'utf8');
    return normalizePricingRecord(JSON.parse(raw));
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writePricingRecord(defaultPricingRecord);
      return defaultPricingRecord;
    }

    throw error;
  }
};

export const writePricingRecord = async (record: PricingRecord) => {
  await mkdir(dirname(pricingFilePath), { recursive: true });
  await writeFile(pricingFilePath, `${JSON.stringify(normalizePricingRecord(record), null, 2)}\n`, 'utf8');
};

export const getPricingLocale = (value: unknown): Locale => {
  if (typeof value === 'string' && supportedLocales.includes(value as Locale)) {
    return value as Locale;
  }

  return 'en';
};

export const localizePricingRecord = (record: PricingRecord, locale: Locale): PricingSection => {
  const content = record.content[locale] ?? record.content.en;

  return {
    ...content,
    tiers: record.tiers.map((tier) => {
      const tierContent = tier.content[locale] ?? tier.content.en;

      return {
        id: tier.id,
        price: tier.price,
        category: tier.category,
        highlighted: tier.highlighted,
        ...tierContent,
      };
    }),
  };
};
