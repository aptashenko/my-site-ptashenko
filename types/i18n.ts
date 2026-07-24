export type Locale = 'en' | 'ru' | 'uk';

export type TextPair = [string, string];

export type ServiceIcon = 'product' | 'chatbot' | 'automation' | 'frontend';

export type CaseIcon = 'flight' | 'chatbot' | 'funnel' | 'subscription' | 'community' | 'giveaway';

export type CaseStack =
  | 'vue'
  | 'nuxt'
  | 'node'
  | 'postgres'
  | 'telegram'
  | 'googleSheets'
  | 'api'
  | 'crm'
  | 'stripe'
  | 'wayforpay';

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
}

export interface CaseItem {
  id: string;
  icon: CaseIcon;
  type: string;
  title: string;
  summary: string;
  result: string;
  stack: CaseStack[];
  projectUrl?: string;
  previewImage: string;
  fullImage: string;
  imageAlt: string;
}

export interface CaseTranslation {
  type: string;
  title: string;
  summary: string;
  result: string;
  imageAlt: string;
}

export interface CaseRecord {
  id: string;
  icon: CaseIcon;
  stack: CaseStack[];
  projectUrl?: string;
  previewImage: string;
  fullImage: string;
  content: Record<Locale, CaseTranslation>;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ReviewRecord {
  id: string;
  name: string;
  role: string;
  text: string;
  link?: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface PricingTierTranslation {
  name: string;
  description: string;
  suitableFor: string;
  features: string[];
}

export interface PricingTierRecord {
  id: string;
  price: string;
  category: string;
  highlighted: boolean;
  content: Record<Locale, PricingTierTranslation>;
}

export interface PricingExampleTranslation {
  title: string;
  beforeTitle: string;
  beforeText: string;
  afterTitle: string;
  afterText: string;
}

export interface PricingSectionTranslation {
  kicker: string;
  title: string;
  intro: string;
  detailsLabel: string;
  suitableLabel: string;
  actionLabel: string;
  factorsTitle: string;
  factorsIntro: string;
  factors: string[];
  example: PricingExampleTranslation;
}

export interface PricingRecord {
  content: Record<Locale, PricingSectionTranslation>;
  tiers: PricingTierRecord[];
}

export interface PricingTierItem {
  id: string;
  price: string;
  category: string;
  highlighted: boolean;
  name: string;
  description: string;
  suitableFor: string;
  features: string[];
}

export interface PricingSection {
  kicker: string;
  title: string;
  intro: string;
  detailsLabel: string;
  suitableLabel: string;
  actionLabel: string;
  factorsTitle: string;
  factorsIntro: string;
  factors: string[];
  example: PricingExampleTranslation;
  tiers: PricingTierItem[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface SiteTranslations {
  meta: {
    title: string;
    description: string;
  };
  header: {
    aria: string;
    sectionsAria: string;
    services: string;
    pricing: string;
    cases: string;
    process: string;
    reviews: string;
    contacts: string;
    write: string;
    languageAria: string;
  };
  hero: {
    availability: string;
    eyebrow: string;
    title: string;
    copy: string;
    actionsAria: string;
    discuss: string;
    works: string;
    factsAria: string;
    facts: TextPair[];
  };
  services: {
    kicker: string;
    title: string;
    items: ServiceItem[];
  };
  cases: {
    kicker: string;
    title: string;
    description: string;
    resultLabel: string;
    stackLabel: string;
    projectLinkLabel: string;
    projectLinkPlaceholder: string;
    openPreviewLabel: string;
    closePreviewLabel: string;
    previousLabel: string;
    nextLabel: string;
  };
  process: {
    kicker: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
  };
  reviews: {
    kicker: string;
    title: string;
    description: string;
    empty: string;
    openForm: string;
    modalTitle: string;
    modalDescription: string;
    closeModal: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      roleLabel: string;
      rolePlaceholder: string;
      linkLabel: string;
      linkPlaceholder: string;
      textLabel: string;
      textPlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  contacts: {
    kicker: string;
    title: string;
    copy: string;
    responseTime: string;
    photoAlt: string;
    openForm: string;
    modalTitle: string;
    modalDescription: string;
    closeModal: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      typeLabel: string;
      typePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    checklistTitle: string;
    checklist: string[];
  };
}
