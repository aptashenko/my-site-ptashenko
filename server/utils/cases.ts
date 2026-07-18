import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createError } from 'h3';
import type { CaseIcon, CaseItem, CaseRecord, CaseStack, Locale } from '~/types/i18n';

const casesFilePath = join(process.cwd(), 'server/data/cases.json');

const supportedLocales: Locale[] = ['en', 'ru', 'uk'];

const caseIcons: CaseIcon[] = [
  'flight',
  'chatbot',
  'funnel',
  'subscription',
  'community',
  'giveaway',
];

const caseStacks: CaseStack[] = [
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

const textFields = ['type', 'title', 'summary', 'result', 'imageAlt'] as const;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);

const sanitizeText = (value: unknown, maxLength = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const sanitizePath = (value: unknown) => sanitizeText(value, 300);

const normalizeLocale = (value: unknown): Locale => {
  if (typeof value === 'string' && supportedLocales.includes(value as Locale)) {
    return value as Locale;
  }

  return 'en';
};

export const getCaseLocale = (value: unknown): Locale => normalizeLocale(value);

export const readCaseRecords = async (): Promise<CaseRecord[]> => {
  try {
    const raw = await readFile(casesFilePath, 'utf8');
    return JSON.parse(raw) as CaseRecord[];
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeCaseRecords([]);
      return [];
    }

    throw error;
  }
};

export const writeCaseRecords = async (records: CaseRecord[]) => {
  await mkdir(dirname(casesFilePath), { recursive: true });
  await writeFile(casesFilePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
};

export const localizeCaseRecord = (record: CaseRecord, locale: Locale): CaseItem => {
  const content = record.content[locale] ?? record.content.en;

  return {
    id: record.id,
    icon: record.icon,
    type: content.type,
    title: content.title,
    summary: content.summary,
    result: content.result,
    stack: record.stack,
    projectUrl: record.projectUrl,
    previewImage: record.previewImage,
    fullImage: record.fullImage,
    imageAlt: content.imageAlt,
  };
};

export const normalizeCaseRecord = (value: unknown, fallbackId?: string): CaseRecord => {
  const input = (value && typeof value === 'object' ? value : {}) as Partial<CaseRecord>;
  const fallbackContent = input.content?.en;
  const id =
    slugify(sanitizeText(input.id, 100)) ||
    slugify(sanitizeText(fallbackContent?.title, 100)) ||
    fallbackId ||
    randomUUID();

  const icon = caseIcons.includes(input.icon as CaseIcon) ? (input.icon as CaseIcon) : 'flight';
  const stack = Array.isArray(input.stack)
    ? input.stack.filter((item): item is CaseStack => caseStacks.includes(item as CaseStack))
    : [];

  const content = supportedLocales.reduce(
    (acc, locale) => {
      const localeContent = input.content?.[locale] ?? fallbackContent;

      acc[locale] = textFields.reduce(
        (textAcc, field) => {
          textAcc[field] = sanitizeText(localeContent?.[field], field === 'title' ? 180 : 2000);
          return textAcc;
        },
        {} as CaseRecord['content'][Locale],
      );

      return acc;
    },
    {} as CaseRecord['content'],
  );

  if (!content.en.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'English title is required.',
    });
  }

  return {
    id,
    icon,
    stack,
    projectUrl: sanitizeText(input.projectUrl, 500) || undefined,
    previewImage: sanitizePath(input.previewImage) || '/cases/flight-agents.svg',
    fullImage: sanitizePath(input.fullImage) || sanitizePath(input.previewImage) || '/cases/flight-agents.svg',
    content,
  };
};

export const createUniqueCaseId = (record: CaseRecord, records: CaseRecord[]) => {
  const baseId = record.id || slugify(record.content.en.title) || randomUUID();
  let nextId = baseId;
  let suffix = 2;

  while (records.some((item) => item.id === nextId)) {
    nextId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return nextId;
};
