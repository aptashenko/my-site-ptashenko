<script setup lang="ts">
import { ArrowRight, Send } from '@lucide/vue';
import { telegramHref } from '~/data/site';

const { content } = useSiteLocale();
</script>

<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-content">
      <p class="availability-badge hero-reveal hero-reveal-1">
        <span aria-hidden="true"></span>
        {{ content.hero.availability }}
      </p>

      <p class="eyebrow hero-reveal hero-reveal-2">{{ content.hero.eyebrow }}</p>

      <h1 id="hero-title" class="hero-reveal hero-reveal-3">
        {{ content.hero.title }}
      </h1>

      <p class="hero-copy hero-reveal hero-reveal-4">
        {{ content.hero.copy }}
      </p>

      <div
        class="hero-actions hero-reveal hero-reveal-5"
        :aria-label="content.hero.actionsAria"
      >
        <a class="button button-primary" :href="telegramHref" target="_blank" rel="noreferrer">
          <Send :size="18" aria-hidden="true" />
          {{ content.hero.discuss }}
        </a>
        <a class="button button-secondary" href="#cases">
          {{ content.hero.works }}
          <ArrowRight :size="18" aria-hidden="true" />
        </a>
      </div>

      <dl class="hero-facts hero-reveal hero-reveal-6" :aria-label="content.hero.factsAria">
        <div v-for="[title, description] in content.hero.facts" :key="title">
          <dt>{{ title }}</dt>
          <dd>{{ description }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
