import { defineEventHandler } from 'h3';
import { readReviewRecords } from '../utils/reviews';

export default defineEventHandler(async () => {
  const reviews = await readReviewRecords();

  return reviews
    .filter((review) => review.status === 'approved')
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
});
