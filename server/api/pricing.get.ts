import { defineEventHandler, getQuery } from 'h3';
import { getPricingLocale, localizePricingRecord, readPricingRecord } from '../utils/pricing';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locale = getPricingLocale(query.locale);
  const record = await readPricingRecord();

  return localizePricingRecord(record, locale);
});
