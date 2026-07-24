import { defineEventHandler } from 'h3';
import { assertAdminAuthorized } from '../../utils/adminAuth';
import { readPricingRecord } from '../../utils/pricing';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  return readPricingRecord();
});
