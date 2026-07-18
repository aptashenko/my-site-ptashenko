import { defineEventHandler, readBody } from 'h3';
import { createPendingReview, readReviewRecords, writeReviewRecords } from '../utils/reviews';

interface ReviewBody {
  name?: string;
  role?: string;
  text?: string;
  link?: string;
  website?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ReviewBody>(event);

  if (body.website) {
    return { ok: true };
  }

  const reviews = await readReviewRecords();
  const review = createPendingReview(body);

  await writeReviewRecords([review, ...reviews]);

  return { ok: true };
});
