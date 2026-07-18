import { defineEventHandler } from 'h3';
import { assertAdminAuthorized } from '../../utils/adminAuth';
import { readCaseRecords } from '../../utils/cases';

export default defineEventHandler(async (event) => {
  assertAdminAuthorized(event);

  return readCaseRecords();
});
