<script setup lang="ts">
import { Bot, Code2, Rocket, Workflow } from '@lucide/vue';
import type { Component } from 'vue';
import type { ServiceIcon } from '~/types/i18n';

const { content } = useSiteLocale();

const serviceIcons: Record<ServiceIcon, Component> = {
  product: Rocket,
  chatbot: Bot,
  automation: Workflow,
  frontend: Code2,
};
</script>

<template>
  <section id="services" class="content-section">
    <p class="section-kicker">{{ content.services.kicker }}</p>
    <h2>{{ content.services.title }}</h2>

    <div class="section-grid">
      <article
        v-for="item in content.services.items"
        :key="item.title"
        class="service-card"
      >
        <div class="service-icon" aria-hidden="true">
          <component :is="serviceIcons[item.icon]" :size="22" />
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>
