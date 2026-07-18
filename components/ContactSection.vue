<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Mail, Send, X } from '@lucide/vue';
import { contactEmail, contactHref, profilePhoto, socialLinks } from '~/data/site';

const { content } = useSiteLocale();

const isFormOpen = ref(false);

const form = reactive({
  name: '',
  contact: '',
  projectType: '',
  message: '',
  website: '',
});

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

const openForm = () => {
  status.value = 'idle';
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const submitContact = async () => {
  status.value = 'sending';

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    });

    status.value = 'success';
    form.name = '';
    form.contact = '';
    form.projectType = '';
    form.message = '';
  } catch {
    status.value = 'error';
  }
};
</script>

<template>
  <section id="contacts" class="content-section contact-section">
    <div class="contact-layout">
      <div class="contact-heading">
        <p class="section-kicker">{{ content.contacts.kicker }}</p>
        <h2>{{ content.contacts.title }}</h2>
        <p class="contact-copy">
          {{ content.contacts.copy }}
        </p>
      </div>

      <div class="contact-profile-card">
        <div class="contact-profile">
          <img :src="profilePhoto" :alt="content.contacts.photoAlt" />
          <div>
            <p>{{ content.contacts.responseTime }}</p>
            <a :href="contactHref">
              <Mail :size="17" aria-hidden="true" />
              {{ contactEmail }}
            </a>

            <nav class="social-links" aria-label="Social links">
              <a
                v-for="link in socialLinks"
                :key="link.id"
                class="social-link"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                :aria-label="link.label"
                :title="link.label"
              >
                <SocialIcon :name="link.id" />
              </a>
            </nav>
          </div>
        </div>

        <div class="contact-actions">
          <button class="button button-primary" type="button" @click="openForm">
            <Send :size="18" aria-hidden="true" />
            {{ content.contacts.openForm }}
          </button>
          <a class="button button-secondary" :href="contactHref">
            <Mail :size="18" aria-hidden="true" />
            {{ contactEmail }}
          </a>
        </div>
      </div>

      <aside class="contact-checklist">
        <h3>{{ content.contacts.checklistTitle }}</h3>
        <ul>
          <li v-for="item in content.contacts.checklist" :key="item">
            {{ item }}
          </li>
        </ul>
      </aside>
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
                :aria-label="content.contacts.closeModal"
                @click="closeForm"
              >
                <X :size="20" aria-hidden="true" />
              </button>

              <DialogTitle class="contact-modal-title">
                {{ content.contacts.modalTitle }}
              </DialogTitle>
              <p class="contact-modal-description">
                {{ content.contacts.modalDescription }}
              </p>

              <form class="contact-form" @submit.prevent="submitContact">
                <input
                  v-model="form.website"
                  class="contact-honeypot"
                  tabindex="-1"
                  autocomplete="off"
                />

                <label>
                  <span>{{ content.contacts.form.nameLabel }}</span>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    :placeholder="content.contacts.form.namePlaceholder"
                    required
                  />
                </label>

                <label>
                  <span>{{ content.contacts.form.contactLabel }}</span>
                  <input
                    v-model="form.contact"
                    type="text"
                    name="contact"
                    :placeholder="content.contacts.form.contactPlaceholder"
                    required
                  />
                </label>

                <label>
                  <span>{{ content.contacts.form.typeLabel }}</span>
                  <input
                    v-model="form.projectType"
                    type="text"
                    name="projectType"
                    :placeholder="content.contacts.form.typePlaceholder"
                  />
                </label>

                <label>
                  <span>{{ content.contacts.form.messageLabel }}</span>
                  <textarea
                    v-model="form.message"
                    name="message"
                    rows="5"
                    :placeholder="content.contacts.form.messagePlaceholder"
                    required
                  ></textarea>
                </label>

                <button class="button button-primary" type="submit" :disabled="status === 'sending'">
                  <Send :size="18" aria-hidden="true" />
                  {{
                    status === 'sending'
                      ? content.contacts.form.sending
                      : content.contacts.form.submit
                  }}
                </button>

                <p v-if="status === 'success'" class="form-status success">
                  {{ content.contacts.form.success }}
                </p>
                <p v-else-if="status === 'error'" class="form-status error">
                  {{ content.contacts.form.error }}
                </p>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>
