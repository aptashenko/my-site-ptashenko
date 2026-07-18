<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExternalLink, MessageSquareText, Quote, Send, X } from '@lucide/vue';
import type { ReviewRecord } from '~/types/i18n';

const { content } = useSiteLocale();

const { data: reviews, refresh } = await useFetch<ReviewRecord[]>('/api/reviews', {
  default: () => [],
});

const isFormOpen = ref(false);
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

const form = reactive({
  name: '',
  role: '',
  link: '',
  text: '',
  website: '',
});

const openForm = () => {
  status.value = 'idle';
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const submitReview = async () => {
  status.value = 'sending';

  try {
    await $fetch('/api/reviews', {
      method: 'POST',
      body: form,
    });

    status.value = 'success';
    form.name = '';
    form.role = '';
    form.link = '';
    form.text = '';
    await refresh();
  } catch {
    status.value = 'error';
  }
};
</script>

<template>
  <section id="reviews" class="content-section muted-section">
    <div class="reviews-heading">
      <div>
        <p class="section-kicker">{{ content.reviews.kicker }}</p>
        <h2>{{ content.reviews.title }}</h2>
        <p class="reviews-description">
          {{ content.reviews.description }}
        </p>
      </div>

      <button class="button button-primary" type="button" @click="openForm">
        <MessageSquareText :size="18" aria-hidden="true" />
        {{ content.reviews.openForm }}
      </button>
    </div>

    <div v-if="reviews.length" class="reviews-grid">
      <article
        v-for="(review, index) in reviews"
        :key="review.id"
        class="review-card"
        :class="{ 'review-card-featured': index === 0 }"
      >
        <Quote class="review-quote-icon" :size="24" aria-hidden="true" />
        <p>{{ review.text }}</p>
        <footer>
          <div>
            <strong>{{ review.name }}</strong>
            <span>{{ review.role }}</span>
          </div>
          <a
            v-if="review.link"
            :href="review.link"
            target="_blank"
            rel="noreferrer"
            :aria-label="review.name"
          >
            <ExternalLink :size="17" aria-hidden="true" />
          </a>
        </footer>
      </article>
    </div>

    <div v-else class="reviews-empty">
      {{ content.reviews.empty }}
    </div>

    <TransitionRoot appear :show="isFormOpen" as="template">
      <Dialog as="div" class="contact-modal" @close="closeForm">
        <TransitionChild
          as="template"
          enter="modal-fade-enter"
          enter-from="modal-fade-enter-from"
          enter-to="modal-fade-enter-to"
          leave="modal-fade-leave"
          leave-from="modal-fade-leave-from"
          leave-to="modal-fade-leave-to"
        >
          <div class="contact-modal-backdrop" />
        </TransitionChild>

        <div class="contact-modal-scroll">
          <TransitionChild
            as="template"
            enter="modal-panel-enter"
            enter-from="modal-panel-enter-from"
            enter-to="modal-panel-enter-to"
            leave="modal-panel-leave"
            leave-from="modal-panel-leave-from"
            leave-to="modal-panel-leave-to"
          >
            <DialogPanel class="contact-modal-panel">
              <button
                class="contact-modal-close"
                type="button"
                :aria-label="content.reviews.closeModal"
                @click="closeForm"
              >
                <X :size="20" aria-hidden="true" />
              </button>

              <DialogTitle class="contact-modal-title">
                {{ content.reviews.modalTitle }}
              </DialogTitle>
              <p class="contact-modal-description">
                {{ content.reviews.modalDescription }}
              </p>

              <form class="contact-form" @submit.prevent="submitReview">
                <input
                  v-model="form.website"
                  class="contact-honeypot"
                  tabindex="-1"
                  autocomplete="off"
                />

                <label>
                  <span>{{ content.reviews.form.nameLabel }}</span>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    :placeholder="content.reviews.form.namePlaceholder"
                    required
                  />
                </label>

                <label>
                  <span>{{ content.reviews.form.roleLabel }}</span>
                  <input
                    v-model="form.role"
                    type="text"
                    name="role"
                    :placeholder="content.reviews.form.rolePlaceholder"
                  />
                </label>

                <label>
                  <span>{{ content.reviews.form.linkLabel }}</span>
                  <input
                    v-model="form.link"
                    type="url"
                    name="link"
                    :placeholder="content.reviews.form.linkPlaceholder"
                  />
                </label>

                <label>
                  <span>{{ content.reviews.form.textLabel }}</span>
                  <textarea
                    v-model="form.text"
                    name="text"
                    rows="5"
                    :placeholder="content.reviews.form.textPlaceholder"
                    required
                  ></textarea>
                </label>

                <button class="button button-primary" type="submit" :disabled="status === 'sending'">
                  <Send :size="18" aria-hidden="true" />
                  {{
                    status === 'sending'
                      ? content.reviews.form.sending
                      : content.reviews.form.submit
                  }}
                </button>

                <p v-if="status === 'success'" class="form-status success">
                  {{ content.reviews.form.success }}
                </p>
                <p v-else-if="status === 'error'" class="form-status error">
                  {{ content.reviews.form.error }}
                </p>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>
