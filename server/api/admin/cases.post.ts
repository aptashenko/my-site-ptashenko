import { defineEventHandler, readBody } from 'h3';
import { assertAdminAuthorized } from '../../utils/adminAuth';
import {
  createUniqueCaseId,
  normalizeCaseRecord,
  readCaseRecords,
  writeCaseRecords,
} from '../../utils/cases';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  const records = await readCaseRecords();
  const record = normalizeCaseRecord(await readBody(event));
  const nextRecord = {
    ...record,
    id: createUniqueCaseId(record, records),
  };

  await writeCaseRecords([...records, nextRecord]);

  return nextRecord;
});
