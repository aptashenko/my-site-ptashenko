<script setup lang="ts">
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  EyeOff,
  Inbox,
  LayoutDashboard,
  ListPlus,
  LoaderCircle,
  Lock,
  LogOut,
  Pencil,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
} from '@lucide/vue';
import type {
  CaseIcon,
  CaseRecord,
  CaseStack,
  Locale,
  PricingRecord,
  PricingTierRecord,
  ReviewRecord,
  ReviewStatus,
} from '~/types/i18n';

const caseIconOptions: CaseIcon[] = [
  'flight',
  'chatbot',
  'funnel',
  'subscription',
  'community',
  'giveaway',
];

const stackOptions: CaseStack[] = [
  'vue',
  'nuxt',
  'node',
  'postgres',
  'telegram',
  'googleSheets',
  'api',
  'crm',
  'stripe',
  'wayforpay',
];

const localeTabs: Array<{ id: Locale; label: string }> = [
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
  { id: 'uk', label: 'UK' },
];

const login = ref('');
const password = ref('');
const isAuthorized = ref(false);
const authPending = ref(false);
const casesPending = ref(false);
const reviewsPending = ref(false);
const pricingPending = ref(false);
const savePending = ref(false);
const reviewSavePending = ref(false);
const pricingSavePending = ref(false);
const selectedCaseId = ref<string | null>(null);
const selectedReviewId = ref<string | null>(null);
const selectedPricingTierId = ref<string | null>(null);
const activeLocale = ref<Locale>('en');
const errorMessage = ref('');
const successMessage = ref('');
const cases = ref<CaseRecord[]>([]);
const reviews = ref<ReviewRecord[]>([]);

const createEmptyPricingTier = (): PricingTierRecord => ({
  id: '',
  price: '$100-250',
  category: 'Bots',
  highlighted: false,
  content: {
    en: {
      name: '',
      description: '',
      suitableFor: '',
      features: [],
    },
    ru: {
      name: '',
      description: '',
      suitableFor: '',
      features: [],
    },
    uk: {
      name: '',
      description: '',
      suitableFor: '',
      features: [],
    },
  },
});

const createEmptyPricingRecord = (): PricingRecord => ({
  content: {
    en: {
      kicker: '',
      title: '',
      intro: '',
      detailsLabel: '',
      suitableLabel: '',
      actionLabel: '',
      factorsTitle: '',
      factorsIntro: '',
      factors: [],
      example: {
        title: '',
        beforeTitle: '',
        beforeText: '',
        afterTitle: '',
        afterText: '',
      },
    },
    ru: {
      kicker: '',
      title: '',
      intro: '',
      detailsLabel: '',
      suitableLabel: '',
      actionLabel: '',
      factorsTitle: '',
      factorsIntro: '',
      factors: [],
      example: {
        title: '',
        beforeTitle: '',
        beforeText: '',
        afterTitle: '',
        afterText: '',
      },
    },
    uk: {
      kicker: '',
      title: '',
      intro: '',
      detailsLabel: '',
      suitableLabel: '',
      actionLabel: '',
      factorsTitle: '',
      factorsIntro: '',
      factors: [],
      example: {
        title: '',
        beforeTitle: '',
        beforeText: '',
        afterTitle: '',
        afterText: '',
      },
    },
  },
  tiers: [],
});

const createEmptyCase = (): CaseRecord => ({
  id: '',
  icon: 'flight',
  stack: ['vue', 'nuxt', 'node'],
  projectUrl: '',
  previewImage: '/cases/flight-agents.svg',
  fullImage: '/cases/flight-agents.svg',
  content: {
    en: {
      type: '',
      title: '',
      summary: '',
      result: '',
      imageAlt: '',
    },
    ru: {
      type: '',
      title: '',
      summary: '',
      result: '',
      imageAlt: '',
    },
    uk: {
      type: '',
      title: '',
      summary: '',
      result: '',
      imageAlt: '',
    },
  },
});

const draft = ref<CaseRecord>(createEmptyCase());
const pricingDraft = ref<PricingRecord>(createEmptyPricingRecord());
const reviewDraft = ref<ReviewRecord>({
  id: '',
  name: '',
  role: '',
  text: '',
  link: '',
  status: 'pending',
  createdAt: '',
});

const cloneCase = (record: CaseRecord): CaseRecord =>
  JSON.parse(JSON.stringify(record)) as CaseRecord;

const clonePricing = (record: PricingRecord): PricingRecord =>
  JSON.parse(JSON.stringify(record)) as PricingRecord;

const isEditing = computed(() => Boolean(selectedCaseId.value));
const selectedCase = computed(() =>
  cases.value.find((item) => item.id === selectedCaseId.value),
);
const selectedReview = computed(() =>
  reviews.value.find((item) => item.id === selectedReviewId.value),
);
const selectedPricingTier = computed(() =>
  pricingDraft.value.tiers.find((item) => item.id === selectedPricingTierId.value),
);
const pendingReviewsCount = computed(
  () => reviews.value.filter((review) => review.status === 'pending').length,
);

useHead({
  title: 'Admin - Ptashenko',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
});

const clearMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
};

const loadCases = async () => {
  casesPending.value = true;
  clearMessages();

  try {
    cases.value = await $fetch<CaseRecord[]>('/api/admin/cases');

    if (selectedCaseId.value) {
      const freshSelected = cases.value.find((item) => item.id === selectedCaseId.value);

      if (freshSelected) {
        draft.value = cloneCase(freshSelected);
      }
    }
  } catch {
    errorMessage.value = 'Не удалось загрузить кейсы.';
  } finally {
    casesPending.value = false;
  }
};

const loadReviews = async () => {
  reviewsPending.value = true;
  clearMessages();

  try {
    reviews.value = await $fetch<ReviewRecord[]>('/api/admin/reviews');

    if (selectedReviewId.value) {
      const freshSelected = reviews.value.find((item) => item.id === selectedReviewId.value);

      if (freshSelected) {
        reviewDraft.value = { ...freshSelected };
      }
    }
  } catch {
    errorMessage.value = 'Не удалось загрузить отзывы.';
  } finally {
    reviewsPending.value = false;
  }
};

const loadPricing = async () => {
  pricingPending.value = true;
  clearMessages();

  try {
    const record = await $fetch<PricingRecord>('/api/admin/pricing');
    pricingDraft.value = clonePricing(record);
    selectedPricingTierId.value = pricingDraft.value.tiers[0]?.id ?? null;
  } catch {
    errorMessage.value = 'Не удалось загрузить блок стоимости.';
  } finally {
    pricingPending.value = false;
  }
};

const checkSession = async () => {
  try {
    const session = await $fetch<{ authenticated: boolean }>('/api/admin/session');
    isAuthorized.value = session.authenticated;

    if (session.authenticated) {
      await loadCases();
      await loadReviews();
      await loadPricing();
    }
  } catch {
    isAuthorized.value = false;
  }
};

const signIn = async () => {
  authPending.value = true;
  clearMessages();

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        login: login.value,
        password: password.value,
      },
    });

    isAuthorized.value = true;
    password.value = '';
    await loadCases();
    await loadReviews();
    await loadPricing();
  } catch {
    errorMessage.value = 'Неверный логин или пароль.';
  } finally {
    authPending.value = false;
  }
};

const signOut = async () => {
  await $fetch('/api/admin/logout', {
    method: 'POST',
  });

  isAuthorized.value = false;
  selectedCaseId.value = null;
  selectedReviewId.value = null;
  selectedPricingTierId.value = null;
  draft.value = createEmptyCase();
  pricingDraft.value = createEmptyPricingRecord();
  login.value = '';
  password.value = '';
  clearMessages();
};

const listToText = (items: string[]) => items.join('\n');

const textToList = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const updatePricingFactors = (value: string) => {
  pricingDraft.value.content[activeLocale.value].factors = textToList(value);
};

const updatePricingFeatures = (tier: PricingTierRecord, value: string) => {
  tier.content[activeLocale.value].features = textToList(value);
};

const selectPricingTier = (tier: PricingTierRecord) => {
  selectedPricingTierId.value = tier.id;
  clearMessages();
};

const createPricingTier = () => {
  const nextTier = createEmptyPricingTier();
  nextTier.id = `pricing-${Date.now()}`;
  pricingDraft.value.tiers.push(nextTier);
  selectedPricingTierId.value = nextTier.id;
  clearMessages();
};

const deletePricingTier = () => {
  if (!selectedPricingTierId.value || !window.confirm('Удалить эту карточку стоимости?')) {
    return;
  }

  pricingDraft.value.tiers = pricingDraft.value.tiers.filter(
    (tier) => tier.id !== selectedPricingTierId.value,
  );
  selectedPricingTierId.value = pricingDraft.value.tiers[0]?.id ?? null;
};

const savePricing = async () => {
  pricingSavePending.value = true;
  clearMessages();

  try {
    const savedPricing = await $fetch<PricingRecord>('/api/admin/pricing', {
      method: 'PUT',
      body: pricingDraft.value,
    });

    pricingDraft.value = clonePricing(savedPricing);
    selectedPricingTierId.value =
      pricingDraft.value.tiers.find((tier) => tier.id === selectedPricingTierId.value)?.id ??
      pricingDraft.value.tiers[0]?.id ??
      null;
    successMessage.value = 'Блок стоимости сохранён.';
  } catch {
    errorMessage.value = 'Не удалось сохранить блок стоимости.';
  } finally {
    pricingSavePending.value = false;
  }
};

const selectCase = (record: CaseRecord) => {
  selectedCaseId.value = record.id;
  draft.value = cloneCase(record);
  clearMessages();
};

const createCase = () => {
  selectedCaseId.value = null;
  draft.value = createEmptyCase();
  clearMessages();
};

const saveCase = async () => {
  savePending.value = true;
  clearMessages();

  try {
    const savedCase = await $fetch<CaseRecord>(
      selectedCaseId.value ? `/api/admin/cases/${selectedCaseId.value}` : '/api/admin/cases',
      {
        method: selectedCaseId.value ? 'PUT' : 'POST',
        body: draft.value,
      },
    );

    selectedCaseId.value = savedCase.id;
    successMessage.value = 'Кейс сохранён.';
    await loadCases();
  } catch {
    errorMessage.value = 'Не удалось сохранить кейс. Проверьте заголовок EN и поля формы.';
  } finally {
    savePending.value = false;
  }
};

const deleteCase = async () => {
  if (!selectedCaseId.value || !window.confirm('Удалить этот кейс?')) {
    return;
  }

  clearMessages();

  try {
    await $fetch(`/api/admin/cases/${selectedCaseId.value}`, {
      method: 'DELETE',
    });

    selectedCaseId.value = null;
    draft.value = createEmptyCase();
    successMessage.value = 'Кейс удалён.';
    await loadCases();
  } catch {
    errorMessage.value = 'Не удалось удалить кейс.';
  }
};

const selectReview = (review: ReviewRecord) => {
  selectedReviewId.value = review.id;
  reviewDraft.value = { ...review };
  clearMessages();
};

const saveReview = async () => {
  if (!selectedReviewId.value) {
    return;
  }

  reviewSavePending.value = true;
  clearMessages();

  try {
    const savedReview = await $fetch<ReviewRecord>(
      `/api/admin/reviews/${selectedReviewId.value}`,
      {
        method: 'PUT',
        body: reviewDraft.value,
      },
    );

    reviewDraft.value = { ...savedReview };
    successMessage.value = 'Отзыв сохранён.';
    await loadReviews();
  } catch {
    errorMessage.value = 'Не удалось сохранить отзыв.';
  } finally {
    reviewSavePending.value = false;
  }
};

const setReviewStatus = async (status: ReviewStatus) => {
  reviewDraft.value.status = status;
  await saveReview();
};

const deleteReview = async () => {
  if (!selectedReviewId.value || !window.confirm('Удалить этот отзыв?')) {
    return;
  }

  clearMessages();

  try {
    await $fetch(`/api/admin/reviews/${selectedReviewId.value}`, {
      method: 'DELETE',
    });

    selectedReviewId.value = null;
    reviewDraft.value = {
      id: '',
      name: '',
      role: '',
      text: '',
      link: '',
      status: 'pending',
      createdAt: '',
    };
    successMessage.value = 'Отзыв удалён.';
    await loadReviews();
  } catch {
    errorMessage.value = 'Не удалось удалить отзыв.';
  }
};

onMounted(checkSession);
</script>

<template>
  <main class="admin-page">
    <section v-if="!isAuthorized" class="admin-login-shell" aria-labelledby="admin-login-title">
      <form class="admin-login-card" @submit.prevent="signIn">
        <div class="admin-login-mark" aria-hidden="true">
          <Lock :size="24" />
        </div>

        <p class="admin-kicker">Admin access</p>
        <h1 id="admin-login-title">Вход в админку</h1>
        <p class="admin-login-copy">
          Управление кейсами, ссылками на проекты и текстами карточек.
        </p>

        <label class="admin-field">
          <span>Логин</span>
          <input
            v-model="login"
            autocomplete="username"
            name="login"
            placeholder="admin"
            type="text"
          />
        </label>

        <label class="admin-field">
          <span>Пароль</span>
          <input
            v-model="password"
            autocomplete="current-password"
            name="password"
            placeholder="Введите пароль"
            type="password"
          />
        </label>

        <p v-if="errorMessage" class="admin-error" role="alert">
          {{ errorMessage }}
        </p>

        <button class="admin-submit" type="submit" :disabled="authPending">
          <LoaderCircle v-if="authPending" :size="18" aria-hidden="true" />
          <ShieldCheck v-else :size="18" aria-hidden="true" />
          Войти
        </button>
      </form>
    </section>

    <section v-else class="admin-dashboard" aria-labelledby="admin-dashboard-title">
      <aside class="admin-sidebar">
        <a class="admin-brand" href="/">
          <span class="brand-mark" aria-hidden="true">P</span>
          <span>Ptashenko</span>
        </a>

        <nav class="admin-nav" aria-label="Admin sections">
          <a class="active" href="#overview">
            <LayoutDashboard :size="18" aria-hidden="true" />
            Обзор
          </a>
          <a href="#cases">
            <BriefcaseBusiness :size="18" aria-hidden="true" />
            Кейсы
          </a>
          <a href="#pricing">
            <CircleDollarSign :size="18" aria-hidden="true" />
            Стоимость
          </a>
          <a href="#requests">
            <Inbox :size="18" aria-hidden="true" />
            Заявки
          </a>
          <a href="#reviews">
            <CheckCircle2 :size="18" aria-hidden="true" />
            Отзывы
          </a>
          <a href="#settings">
            <Settings :size="18" aria-hidden="true" />
            Настройки
          </a>
        </nav>

        <button class="admin-logout" type="button" @click="signOut">
          <LogOut :size="18" aria-hidden="true" />
          Выйти
        </button>
      </aside>

      <div class="admin-content">
        <header class="admin-topbar">
          <div>
            <p class="admin-kicker">Dashboard</p>
            <h1 id="admin-dashboard-title">Админ-панель</h1>
          </div>
          <span class="admin-status">
            <ShieldCheck :size="16" aria-hidden="true" />
            admin
          </span>
        </header>

        <div id="overview" class="admin-stats-grid">
          <article class="admin-stat">
            <span>Кейсы</span>
            <strong>{{ cases.length }}</strong>
            <p>Карточки берутся с серверного JSON.</p>
          </article>
          <article class="admin-stat">
            <span>Отзывы</span>
            <strong>{{ pendingReviewsCount }}</strong>
            <p>Новые отзывы ожидают модерации.</p>
          </article>
          <article class="admin-stat">
            <span>Стоимость</span>
            <strong>{{ pricingDraft.tiers.length }}</strong>
            <p>Карточки цен управляются из отдельного JSON.</p>
          </article>
          <article class="admin-stat">
            <span>Статус</span>
            <strong>{{ casesPending || reviewsPending || pricingPending ? 'Загрузка' : 'Готово' }}</strong>
            <p>Изменения сразу влияют на лендинг.</p>
          </article>
        </div>

        <p v-if="errorMessage" class="admin-error" role="alert">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="admin-success" role="status">
          {{ successMessage }}
        </p>

        <div class="admin-workspace admin-workspace-wide">
          <section id="cases" class="admin-panel">
            <div class="admin-panel-heading admin-panel-heading-actions">
              <div>
                <h2>Кейсы</h2>
                <p>Выберите карточку для изменения или создайте новую.</p>
              </div>
              <button class="admin-secondary-action" type="button" @click="createCase">
                <ListPlus :size="17" aria-hidden="true" />
                Новый
              </button>
            </div>

            <div class="admin-case-list">
              <button
                v-for="item in cases"
                :key="item.id"
                class="admin-case-row"
                :class="{ active: item.id === selectedCaseId }"
                type="button"
                @click="selectCase(item)"
              >
                <span>{{ item.content.ru.title || item.content.en.title }}</span>
                <small>{{ item.id }}</small>
              </button>
              <div v-if="!cases.length && !casesPending" class="admin-empty-state">
                Кейсов пока нет.
              </div>
            </div>
          </section>

          <section class="admin-panel">
            <div class="admin-panel-heading">
              <Pencil :size="20" aria-hidden="true" />
              <div>
                <h2>{{ isEditing ? 'Редактирование' : 'Новый кейс' }}</h2>
                <p>Заполните EN как минимум: сервер использует его для ID и fallback.</p>
              </div>
            </div>

            <form class="admin-case-form" @submit.prevent="saveCase">
              <div class="admin-form-grid">
                <label class="admin-field">
                  <span>ID</span>
                  <input
                    v-model="draft.id"
                    :disabled="isEditing"
                    placeholder="case-slug"
                    type="text"
                  />
                </label>

                <label class="admin-field">
                  <span>Иконка</span>
                  <select v-model="draft.icon">
                    <option v-for="icon in caseIconOptions" :key="icon" :value="icon">
                      {{ icon }}
                    </option>
                  </select>
                </label>
              </div>

              <label class="admin-field">
                <span>Ссылка на проект</span>
                <input v-model="draft.projectUrl" placeholder="https://example.com" type="url" />
              </label>

              <div class="admin-form-grid">
                <label class="admin-field">
                  <span>Preview image</span>
                  <input v-model="draft.previewImage" placeholder="/cases/name.svg" type="text" />
                </label>

                <label class="admin-field">
                  <span>Full image</span>
                  <input v-model="draft.fullImage" placeholder="/cases/name.svg" type="text" />
                </label>
              </div>

              <label class="admin-field">
                <span>Стек</span>
                <select v-model="draft.stack" multiple>
                  <option v-for="stack in stackOptions" :key="stack" :value="stack">
                    {{ stack }}
                  </option>
                </select>
              </label>

              <div class="admin-locale-tabs" role="tablist" aria-label="Case language">
                <button
                  v-for="locale in localeTabs"
                  :key="locale.id"
                  :class="{ active: activeLocale === locale.id }"
                  type="button"
                  @click="activeLocale = locale.id"
                >
                  {{ locale.label }}
                </button>
              </div>

              <div class="admin-locale-fields">
                <label class="admin-field">
                  <span>Тип</span>
                  <input v-model="draft.content[activeLocale].type" type="text" />
                </label>

                <label class="admin-field">
                  <span>Заголовок</span>
                  <input v-model="draft.content[activeLocale].title" type="text" />
                </label>

                <label class="admin-field">
                  <span>Краткое описание</span>
                  <textarea v-model="draft.content[activeLocale].summary" rows="3" />
                </label>

                <label class="admin-field">
                  <span>Результат</span>
                  <textarea v-model="draft.content[activeLocale].result" rows="3" />
                </label>

                <label class="admin-field">
                  <span>Alt изображения</span>
                  <input v-model="draft.content[activeLocale].imageAlt" type="text" />
                </label>
              </div>

              <div class="admin-form-actions">
                <button class="admin-submit" type="submit" :disabled="savePending">
                  <LoaderCircle v-if="savePending" :size="18" aria-hidden="true" />
                  <Save v-else :size="18" aria-hidden="true" />
                  Сохранить
                </button>

                <button
                  v-if="isEditing"
                  class="admin-danger-action"
                  type="button"
                  @click="deleteCase"
                >
                  <Trash2 :size="18" aria-hidden="true" />
                  Удалить
                </button>
              </div>
            </form>
          </section>
        </div>

        <section id="pricing" class="admin-panel admin-panel-wide">
          <div class="admin-panel-heading admin-panel-heading-actions">
            <div class="admin-panel-heading">
              <CircleDollarSign :size="20" aria-hidden="true" />
              <div>
                <h2>Стоимость</h2>
                <p>Управление заголовками, карточками цен, факторами и примером автоматизации.</p>
              </div>
            </div>
            <button class="admin-secondary-action" type="button" @click="savePricing" :disabled="pricingSavePending">
              <LoaderCircle v-if="pricingSavePending" :size="17" aria-hidden="true" />
              <Save v-else :size="17" aria-hidden="true" />
              Сохранить блок
            </button>
          </div>

          <div class="admin-locale-tabs admin-pricing-locale-tabs" role="tablist" aria-label="Pricing language">
            <button
              v-for="locale in localeTabs"
              :key="locale.id"
              :class="{ active: activeLocale === locale.id }"
              type="button"
              @click="activeLocale = locale.id"
            >
              {{ locale.label }}
            </button>
          </div>

          <form class="admin-case-form" @submit.prevent="savePricing">
            <div class="admin-form-grid">
              <label class="admin-field">
                <span>Kicker</span>
                <input v-model="pricingDraft.content[activeLocale].kicker" type="text" />
              </label>

              <label class="admin-field">
                <span>Кнопка в карточке</span>
                <input v-model="pricingDraft.content[activeLocale].actionLabel" type="text" />
              </label>
            </div>

            <label class="admin-field">
              <span>Заголовок</span>
              <input v-model="pricingDraft.content[activeLocale].title" type="text" />
            </label>

            <label class="admin-field">
              <span>Вводный текст</span>
              <textarea v-model="pricingDraft.content[activeLocale].intro" rows="3" />
            </label>

            <div class="admin-form-grid">
              <label class="admin-field">
                <span>Лейбл details</span>
                <input v-model="pricingDraft.content[activeLocale].detailsLabel" type="text" />
              </label>

              <label class="admin-field">
                <span>Лейбл подходит</span>
                <input v-model="pricingDraft.content[activeLocale].suitableLabel" type="text" />
              </label>
            </div>

            <div class="admin-form-grid">
              <label class="admin-field">
                <span>Заголовок факторов</span>
                <input v-model="pricingDraft.content[activeLocale].factorsTitle" type="text" />
              </label>

              <label class="admin-field">
                <span>Текст факторов</span>
                <textarea v-model="pricingDraft.content[activeLocale].factorsIntro" rows="3" />
              </label>
            </div>

            <label class="admin-field">
              <span>Факторы стоимости, по одному на строку</span>
              <textarea
                :value="listToText(pricingDraft.content[activeLocale].factors)"
                rows="6"
                @input="updatePricingFactors(($event.target as HTMLTextAreaElement).value)"
              />
            </label>

            <div class="admin-form-grid">
              <label class="admin-field">
                <span>Заголовок примера</span>
                <input v-model="pricingDraft.content[activeLocale].example.title" type="text" />
              </label>

              <label class="admin-field">
                <span>До: заголовок</span>
                <input v-model="pricingDraft.content[activeLocale].example.beforeTitle" type="text" />
              </label>
            </div>

            <label class="admin-field">
              <span>До: текст</span>
              <textarea v-model="pricingDraft.content[activeLocale].example.beforeText" rows="3" />
            </label>

            <div class="admin-form-grid">
              <label class="admin-field">
                <span>После: заголовок</span>
                <input v-model="pricingDraft.content[activeLocale].example.afterTitle" type="text" />
              </label>

              <label class="admin-field">
                <span>После: текст</span>
                <textarea v-model="pricingDraft.content[activeLocale].example.afterText" rows="3" />
              </label>
            </div>
          </form>

          <div class="admin-pricing-editor">
            <section class="admin-panel">
              <div class="admin-panel-heading admin-panel-heading-actions">
                <div>
                  <h2>Карточки</h2>
                  <p>Выберите цену для редактирования.</p>
                </div>
                <button class="admin-secondary-action" type="button" @click="createPricingTier">
                  <ListPlus :size="17" aria-hidden="true" />
                  Новая
                </button>
              </div>

              <div class="admin-case-list">
                <button
                  v-for="tier in pricingDraft.tiers"
                  :key="tier.id"
                  class="admin-case-row"
                  :class="{ active: tier.id === selectedPricingTierId }"
                  type="button"
                  @click="selectPricingTier(tier)"
                >
                  <span>{{ tier.price }} · {{ tier.content.ru.name || tier.content.en.name }}</span>
                  <small>{{ tier.category }} · {{ tier.id }}</small>
                </button>
                <div v-if="!pricingDraft.tiers.length && !pricingPending" class="admin-empty-state">
                  Карточек стоимости пока нет.
                </div>
              </div>
            </section>

            <section class="admin-panel">
              <div class="admin-panel-heading">
                <Pencil :size="20" aria-hidden="true" />
                <div>
                  <h2>Редактирование карточки</h2>
                  <p>ID фиксируется для стабильного рендера, остальные поля можно менять.</p>
                </div>
              </div>

              <form v-if="selectedPricingTier" class="admin-case-form" @submit.prevent="savePricing">
                <div class="admin-form-grid">
                  <label class="admin-field">
                    <span>ID</span>
                    <input v-model="selectedPricingTier.id" disabled type="text" />
                  </label>

                  <label class="admin-field">
                    <span>Цена</span>
                    <input v-model="selectedPricingTier.price" placeholder="$500-900" type="text" />
                  </label>
                </div>

                <div class="admin-form-grid">
                  <label class="admin-field">
                    <span>Категория</span>
                    <input v-model="selectedPricingTier.category" placeholder="Bots" type="text" />
                  </label>

                  <label class="admin-field admin-checkbox-field">
                    <input v-model="selectedPricingTier.highlighted" type="checkbox" />
                    <span>Выделить карточку</span>
                  </label>
                </div>

                <label class="admin-field">
                  <span>Название</span>
                  <input v-model="selectedPricingTier.content[activeLocale].name" type="text" />
                </label>

                <label class="admin-field">
                  <span>Описание</span>
                  <textarea v-model="selectedPricingTier.content[activeLocale].description" rows="3" />
                </label>

                <label class="admin-field">
                  <span>Кому подходит</span>
                  <textarea v-model="selectedPricingTier.content[activeLocale].suitableFor" rows="3" />
                </label>

                <label class="admin-field">
                  <span>Возможности, по одной на строку</span>
                  <textarea
                    :value="listToText(selectedPricingTier.content[activeLocale].features)"
                    rows="7"
                    @input="updatePricingFeatures(selectedPricingTier, ($event.target as HTMLTextAreaElement).value)"
                  />
                </label>

                <div class="admin-form-actions">
                  <button class="admin-submit" type="submit" :disabled="pricingSavePending">
                    <LoaderCircle v-if="pricingSavePending" :size="18" aria-hidden="true" />
                    <Save v-else :size="18" aria-hidden="true" />
                    Сохранить
                  </button>

                  <button class="admin-danger-action" type="button" @click="deletePricingTier">
                    <Trash2 :size="18" aria-hidden="true" />
                    Удалить
                  </button>
                </div>
              </form>

              <div v-else class="admin-empty-state">
                Выберите карточку стоимости.
              </div>
            </section>
          </div>
        </section>

        <section id="reviews" class="admin-panel admin-panel-wide">
          <div class="admin-panel-heading">
            <CheckCircle2 :size="20" aria-hidden="true" />
            <div>
              <h2>Отзывы</h2>
              <p>Новые отзывы попадают сюда в статусе pending и публикуются только после одобрения.</p>
            </div>
          </div>

          <div class="admin-review-layout">
            <div class="admin-case-list">
              <button
                v-for="review in reviews"
                :key="review.id"
                class="admin-case-row"
                :class="{ active: review.id === selectedReviewId }"
                type="button"
                @click="selectReview(review)"
              >
                <span>{{ review.name }}</span>
                <small>{{ review.status }} · {{ review.role || 'без роли' }}</small>
              </button>
              <div v-if="!reviews.length && !reviewsPending" class="admin-empty-state">
                Отзывов пока нет.
              </div>
            </div>

            <form v-if="selectedReviewId" class="admin-case-form" @submit.prevent="saveReview">
              <div class="admin-form-grid">
                <label class="admin-field">
                  <span>Имя</span>
                  <input v-model="reviewDraft.name" type="text" />
                </label>

                <label class="admin-field">
                  <span>Статус</span>
                  <select v-model="reviewDraft.status">
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                    <option value="rejected">rejected</option>
                  </select>
                </label>
              </div>

              <label class="admin-field">
                <span>Роль или проект</span>
                <input v-model="reviewDraft.role" type="text" />
              </label>

              <label class="admin-field">
                <span>Ссылка</span>
                <input v-model="reviewDraft.link" type="url" />
              </label>

              <label class="admin-field">
                <span>Текст отзыва</span>
                <textarea v-model="reviewDraft.text" rows="5" />
              </label>

              <div class="admin-form-actions admin-review-actions">
                <button class="admin-submit" type="submit" :disabled="reviewSavePending">
                  <LoaderCircle v-if="reviewSavePending" :size="18" aria-hidden="true" />
                  <Save v-else :size="18" aria-hidden="true" />
                  Сохранить
                </button>
                <button
                  class="admin-secondary-action"
                  type="button"
                  @click="setReviewStatus('approved')"
                >
                  <CheckCircle2 :size="18" aria-hidden="true" />
                  Опубликовать
                </button>
                <button
                  class="admin-secondary-action"
                  type="button"
                  @click="setReviewStatus('rejected')"
                >
                  <EyeOff :size="18" aria-hidden="true" />
                  Скрыть
                </button>
                <button class="admin-danger-action" type="button" @click="deleteReview">
                  <Trash2 :size="18" aria-hidden="true" />
                  Удалить
                </button>
              </div>
            </form>

            <div v-else class="admin-empty-state">
              Выберите отзыв для модерации.
            </div>
          </div>
        </section>

        <section id="settings" class="admin-panel admin-panel-wide">
          <div class="admin-panel-heading">
            <Settings :size="20" aria-hidden="true" />
            <div>
              <h2>Хранилище</h2>
              <p>Кейсы и отзывы сохраняются в server/data/*.json и читаются публичными API.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
