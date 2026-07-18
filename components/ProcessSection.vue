<script setup lang="ts">
const { content } = useSiteLocale();
</script>

<template>
  <section id="process" class="content-section">
    <p class="section-kicker">{{ content.process.kicker }}</p>
    <h2>{{ content.process.title }}</h2>

    <p class="process-intro">
      {{ content.process.intro }}
    </p>

    <ol class="process-timeline">
      <li
        v-for="(step, index) in content.process.steps"
        :key="step.title"
        class="process-step"
      >
        <span class="process-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
