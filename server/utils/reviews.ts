import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createError } from 'h3';
import type { ReviewRecord, ReviewStatus } from '~/types/i18n';

const reviewsFilePath = join(process.cwd(), 'server/data/reviews.json');
const reviewStatuses: ReviewStatus[] = ['pending', 'approved', 'rejected'];

const sanitizeText = (value: unknown, maxLength = 1200) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const sanitizeLink = (value: unknown) => {
  const link = sanitizeText(value, 500);

  if (!link) {
    return undefined;
  }

  try {
    const url = new URL(link);

    if (!['http:', 'https:'].includes(url.protocol)) {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
};

export const readReviewRecords = async (): Promise<ReviewRecord[]> => {
  try {
    const raw = await readFile(reviewsFilePath, 'utf8');
    return JSON.parse(raw) as ReviewRecord[];
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeReviewRecords([]);
      return [];
    }

    throw error;
  }
};

export const writeReviewRecords = async (records: ReviewRecord[]) => {
  await mkdir(dirname(reviewsFilePath), { recursive: true });
  await writeFile(reviewsFilePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
};

export const normalizeReviewStatus = (value: unknown): ReviewStatus => {
  if (typeof value === 'string' && reviewStatuses.includes(value as ReviewStatus)) {
    return value as ReviewStatus;
  }

  return 'pending';
};

export const normalizeReviewRecord = (
  value: unknown,
  fallback?: Partial<ReviewRecord>,
): ReviewRecord => {
  const input = (value && typeof value === 'object' ? value : {}) as Partial<ReviewRecord>;
  const name = sanitizeText(input.name, 120);
  const text = sanitizeText(input.text, 1600);

  if (!name || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and review text are required.',
    });
  }

  return {
    id: fallback?.id ?? (sanitizeText(input.id, 120) || randomUUID()),
    name,
    role: sanitizeText(input.role, 160),
    text,
    link: sanitizeLink(input.link),
    status: normalizeReviewStatus(input.status ?? fallback?.status),
    createdAt: fallback?.createdAt ?? new Date().toISOString(),
  };
};

export const createPendingReview = (value: unknown): ReviewRecord => ({
  ...normalizeReviewRecord(value),
  id: randomUUID(),
  status: 'pending',
  createdAt: new Date().toISOString(),
});
