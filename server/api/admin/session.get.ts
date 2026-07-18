import { defineEventHandler } from 'h3';
import { isAdminAuthorized } from '../../utils/adminAuth';

export default defineEventHandler((event) => ({
  authenticated: isAdminAuthorized(event),
}));
