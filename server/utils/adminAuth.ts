import { createHash, timingSafeEqual } from 'node:crypto';
import { createError, deleteCookie, getCookie, setCookie, type H3Event } from 'h3';
import { useRuntimeConfig } from '#imports';

const adminCookieName = 'ptashenko_admin_session';

const hashValue = (value: string) => createHash('sha256').update(value).digest('hex');

const safeCompare = (current: string, expected: string) => {
  const currentBuffer = Buffer.from(current);
  const expectedBuffer = Buffer.from(expected);

  return (
    currentBuffer.length === expectedBuffer.length &&
    timingSafeEqual(currentBuffer, expectedBuffer)
  );
};

const getAdminCredentials = () => {
  const config = useRuntimeConfig();

  return {
    login: String(config.adminLogin),
    password: String(config.adminPassword),
    sessionSecret: String(config.adminSessionSecret),
  };
};

const createAdminToken = () => {
  const credentials = getAdminCredentials();
  return hashValue(`${credentials.login}:${credentials.password}:${credentials.sessionSecret}`);
};

export const verifyAdminCredentials = (login: string, password: string) => {
  const credentials = getAdminCredentials();

  return (
    safeCompare(login, credentials.login) &&
    safeCompare(password, credentials.password)
  );
};

export const setAdminSession = (event: H3Event) => {
  setCookie(event, adminCookieName, createAdminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
};

export const clearAdminSession = (event: H3Event) => {
  deleteCookie(event, adminCookieName, {
    path: '/',
  });
};

export const isAdminAuthorized = (event: H3Event) => {
  const token = getCookie(event, adminCookieName);

  return Boolean(token && safeCompare(token, createAdminToken()));
};

export const assertAdminAuthorized = (event: H3Event) => {
  if (!isAdminAuthorized(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized.',
    });
  }
};
