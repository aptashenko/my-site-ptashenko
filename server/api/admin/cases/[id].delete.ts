import { createError, defineEventHandler, getRouterParam } from 'h3';
import { assertAdminAuthorized } from '../../../utils/adminAuth';
import { readCaseRecords, writeCaseRecords } from '../../../utils/cases';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const id = getRouterParam(event, 'id');
  const records = await readCaseRecords();
  const nextRecords = records.filter((record) => record.id !== id);

  if (nextRecords.length === records.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Case not found.',
    });
  }

  await writeCaseRecords(nextRecords);

  return { ok: true };
});
