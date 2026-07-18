import { createError, defineEventHandler, getRouterParam } from 'h3';
import { assertAdminAuthorized } from '../../../utils/adminAuth';
import { readReviewRecords, writeReviewRecords } from '../../../utils/reviews';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const id = getRouterParam(event, 'id');
  const reviews = await readReviewRecords();
  const nextReviews = reviews.filter((review) => review.id !== id);

  if (nextReviews.length === reviews.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Review not found.',
    });
  }

  await writeReviewRecords(nextReviews);

  return { ok: true };
});
