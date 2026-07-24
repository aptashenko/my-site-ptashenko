import { defineEventHandler, readBody } from 'h3';
import { assertAdminAuthorized } from '../../utils/adminAuth';
import { normalizePricingRecord, writePricingRecord } from '../../utils/pricing';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const record = normalizePricingRecord(await readBody(event));
  await writePricingRecord(record);

  return record;
});
