<script setup lang="ts">
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Funnel,
  Gift,
  Plane,
  UsersRound,
  X,
} from '@lucide/vue';
import type { Component } from 'vue';
import type { CaseIcon, CaseItem, CaseStack } from '~/types/i18n';

const { content, locale } = useSiteLocale();

const { data: cases } = await useFetch<CaseItem[]>('/api/cases', {
  query: computed(() => ({
    locale: locale.value,
  })),
  default: () => [],
});

const caseIcons: Record<CaseIcon, Component> = {
  flight: Plane,
  chatbot: Bot,
  funnel: Funnel,
  subscription: CreditCard,
  community: UsersRound,
  giveaway: Gift,
};

const stackLabels: Record<CaseStack, string> = {
  vue: 'Vue.js',
  nuxt: 'Nuxt.js',
  node: 'Node.js',
  postgres: 'PostgreSQL',
  telegram: 'Telegram',
  googleSheets: 'Google Sheets',
  api: 'API',
  crm: 'CRM',
  stripe: 'Stripe',
  wayforpay: 'WayForPay',
};

const selectedCase = ref<CaseItem | null>(null);
const carouselViewport = ref<HTMLDivElement | null>(null);

const openCase = (item: CaseItem) => {
  selectedCase.value = item;
};

const closeCase = () => {
  selectedCase.value = null;
};

watch(locale, closeCase);

const scrollCases = (direction: 'previous' | 'next') => {
  const viewport = carouselViewport.value;

  if (!viewport) {
    return;
  }

  viewport.scrollBy({
    left: direction === 'next' ? viewport.clientWidth * 0.82 : -viewport.clientWidth * 0.82,
    behavior: 'smooth',
  });
};
</script>

<template>
  <section id="cases" class="content-section muted-section">
    <p class="section-kicker">{{ content.cases.kicker }}</p>
    <h2>{{ content.cases.title }}</h2>

    <div class="cases-toolbar">
      <p class="cases-intro">
        {{ content.cases.description }}
      </p>

      <div class="carousel-controls" aria-label="Cases carousel controls">
        <button
          type="button"
          :aria-label="content.cases.previousLabel"
          @click="scrollCases('previous')"
        >
          <ChevronLeft :size="20" aria-hidden="true" />
        </button>
        <button
          type="button"
          :aria-label="content.cases.nextLabel"
          @click="scrollCases('next')"
        >
          <ChevronRight :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="cases-carousel" aria-label="Cases catalog">
      <div ref="carouselViewport" class="cases-viewport">
        <div class="cases-track">
          <article
            v-for="item in cases"
            :key="item.id"
            class="case-card"
            role="button"
            tabindex="0"
            :aria-label="`${content.cases.openPreviewLabel}: ${item.title}`"
            @click="openCase(item)"
            @keydown.enter.prevent="openCase(item)"
            @keydown.space.prevent="openCase(item)"
          >
            <div class="case-preview">
              <img :src="item.previewImage" :alt="item.imageAlt" loading="lazy" />
            </div>

            <div class="case-preview-info">
              <div class="case-card-top">
                <div class="case-icon" aria-hidden="true">
                  <component :is="caseIcons[item.icon]" :size="22" />
                </div>
                <p class="case-type">{{ item.type }}</p>
              </div>

              <h3>{{ item.title }}</h3>
              <p class="case-summary">{{ item.summary }}</p>

              <a
                v-if="item.projectUrl"
                class="case-project-link"
                :href="item.projectUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
                @keydown.stop
              >
                <span>{{ content.cases.projectLinkLabel }}</span>
                <ExternalLink :size="16" aria-hidden="true" />
              </a>
              <span v-else class="case-project-link case-project-link-placeholder">
                {{ content.cases.projectLinkPlaceholder }}
              </span>

              <div class="case-stack" :aria-label="content.cases.stackLabel">
                <span
                  v-for="stack in item.stack"
                  :key="stack"
                  class="stack-badge"
                  :aria-label="stackLabels[stack]"
                  :title="stackLabels[stack]"
                >
                  {{ stackLabels[stack] }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedCase"
        class="case-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`case-modal-title-${selectedCase.title}`"
        @click.self="closeCase"
      >
        <div class="case-modal-panel">
          <button
            class="case-modal-close"
            type="button"
            :aria-label="content.cases.closePreviewLabel"
            @click="closeCase"
          >
            <X :size="20" />
          </button>

          <img
            class="case-modal-image"
            :src="selectedCase.fullImage"
            :alt="selectedCase.imageAlt"
          />

          <div class="case-modal-content">
            <div class="case-card-top">
              <div class="case-icon" aria-hidden="true">
                <component :is="caseIcons[selectedCase.icon]" :size="22" />
              </div>
              <p class="case-type">{{ selectedCase.type }}</p>
            </div>

            <h3 :id="`case-modal-title-${selectedCase.title}`">
              {{ selectedCase.title }}
            </h3>
            <p class="case-summary">{{ selectedCase.summary }}</p>

            <div class="case-result">
              <span>{{ content.cases.resultLabel }}</span>
              <p>{{ selectedCase.result }}</p>
            </div>

            <div class="case-stack" :aria-label="content.cases.stackLabel">
              <span
                v-for="stack in selectedCase.stack"
                :key="stack"
                class="stack-badge"
                :aria-label="stackLabels[stack]"
                :title="stackLabels[stack]"
              >
                {{ stackLabels[stack] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
