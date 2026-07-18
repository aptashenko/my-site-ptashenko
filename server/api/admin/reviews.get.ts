import { defineEventHandler } from 'h3';
import { assertAdminAuthorized } from '../../utils/adminAuth';
import { readReviewRecords } from '../../utils/reviews';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const reviews = await readReviewRecords();

  return reviews.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
});
