import { defineEventHandler, getQuery } from 'h3';
import { getCaseLocale, localizeCaseRecord, readCaseRecords } from '../utils/cases';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locale = getCaseLocale(query.locale);
  const records = await readCaseRecords();

  return records.map((record) => localizeCaseRecord(record, locale));
});
