import { createError, defineEventHandler, getRouterParam, readBody } from 'h3';
import { assertAdminAuthorized } from '../../../utils/adminAuth';
import {
  normalizeReviewRecord,
  readReviewRecords,
  writeReviewRecords,
} from '../../../utils/reviews';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const id = getRouterParam(event, 'id');
  const reviews = await readReviewRecords();
  const index = reviews.findIndex((review) => review.id === id);

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Review not found.',
    });
  }

  const review = normalizeReviewRecord(await readBody(event), reviews[index]);

  reviews[index] = {
    ...review,
    id: id as string,
    createdAt: reviews[index].createdAt,
  };

  await writeReviewRecords(reviews);

  return reviews[index];
});
