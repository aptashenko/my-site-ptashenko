<script setup lang="ts">
import {
  Bot,
  Building2,
  Check,
  ClipboardList,
  CreditCard,
  Rocket,
  Users,
} from '@lucide/vue';
import type { Component } from 'vue';
import { telegramHref } from '~/data/site';
import type { PricingSection } from '~/types/i18n';

const { locale } = useSiteLocale();

const { data: pricing } = await useFetch<PricingSection>('/api/pricing', {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
});

const pricingIcons: Record<string, Component> = {
  'simple-bot': Bot,
  'lead-intake-bot': ClipboardList,
  'sales-bot': CreditCard,
  'crm-starter': Users,
  'business-crm': Building2,
  'enterprise-platform': Rocket,
};
</script>

<template>
  <section v-if="pricing" id="pricing" class="content-section pricing-section">
    <div class="pricing-heading">
      <p class="section-kicker">{{ pricing.kicker }}</p>
      <h2>{{ pricing.title }}</h2>
      <p>{{ pricing.intro }}</p>
    </div>

    <div class="pricing-grid">
      <article
        v-for="tier in pricing.tiers"
        :key="tier.id"
        class="pricing-card"
      >
        <div class="pricing-card-icon" aria-hidden="true">
          <component :is="pricingIcons[tier.id] ?? Bot" :size="22" />
        </div>

        <h3>{{ tier.name }}</h3>
        <p class="pricing-description">{{ tier.description }}</p>
        <p class="pricing-price">{{ tier.price }}</p>

        <ul class="pricing-feature-list">
          <li v-for="feature in tier.features.slice(0, 4)" :key="feature">
            <Check :size="15" aria-hidden="true" />
            <span>{{ feature }}</span>
          </li>
        </ul>

        <a class="button button-secondary pricing-action" :href="telegramHref" target="_blank" rel="noreferrer">
          {{ pricing.actionLabel }}
        </a>
      </article>
    </div>

  </section>
</template>
