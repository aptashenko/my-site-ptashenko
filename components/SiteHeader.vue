<script setup lang="ts">
import { Languages, Mail } from '@lucide/vue';
import { contactHref } from '~/data/site';
import { localeLabels, supportedLocales } from '~/data/translations';

const { content, locale, setLocale } = useSiteLocale();
</script>

<template>
  <header class="site-header" :aria-label="content.header.aria">
    <a class="brand" href="#top" aria-label="Ptashenko">
      <span class="brand-mark" aria-hidden="true">P</span>
      <span>Ptashenko</span>
    </a>

    <nav class="nav-links" :aria-label="content.header.sectionsAria">
      <a href="#services">{{ content.header.services }}</a>
      <a href="#cases">{{ content.header.cases }}</a>
      <a href="#process">{{ content.header.process }}</a>
      <a href="#reviews">{{ content.header.reviews }}</a>
      <a href="#contacts">{{ content.header.contacts }}</a>
    </nav>

    <div class="header-controls">
      <div class="language-switcher" :aria-label="content.header.languageAria">
        <Languages class="language-icon" :size="16" aria-hidden="true" />
        <button
          v-for="availableLocale in supportedLocales"
          :key="availableLocale"
          type="button"
          :class="{ active: locale === availableLocale }"
          :aria-pressed="locale === availableLocale"
          @click="setLocale(availableLocale)"
        >
          {{ localeLabels[availableLocale] }}
        </button>
      </div>

      <a class="header-action" :href="contactHref">
        <Mail :size="16" aria-hidden="true" />
        {{ content.header.write }}
      </a>
    </div>
  </header>
</template>
