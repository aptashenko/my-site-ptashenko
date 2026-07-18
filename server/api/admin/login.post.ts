import { createError, defineEventHandler, readBody } from 'h3';
import { setAdminSession, verifyAdminCredentials } from '../../utils/adminAuth';

interface LoginBody {
  login?: string;
  password?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  const login = body.login?.trim() ?? '';
  const password = body.password ?? '';

  if (!verifyAdminCredentials(login, password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid login or password.',
    });
  }

  setAdminSession(event);

  return { ok: true };
});
