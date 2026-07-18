import { createError, defineEventHandler, getRouterParam, readBody } from 'h3';
import { assertAdminAuthorized } from '../../../utils/adminAuth';
import { normalizeCaseRecord, readCaseRecords, writeCaseRecords } from '../../../utils/cases';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const id = getRouterParam(event, 'id');
  const records = await readCaseRecords();
  const index = records.findIndex((record) => record.id === id);

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Case not found.',
    });
  }

  const record = normalizeCaseRecord(await readBody(event), id);
  const nextRecord = {
    ...record,
    id: id as string,
  };

  records[index] = nextRecord;
  await writeCaseRecords(records);

  return nextRecord;
});
