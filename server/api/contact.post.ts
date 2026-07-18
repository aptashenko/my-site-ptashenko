interface ContactBody {
  name?: string;
  contact?: string;
  projectType?: string;
  message?: string;
  website?: string;
}

const sanitize = (value?: string) => value?.trim().slice(0, 1200) ?? '';

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event);

  if (body.website) {
    return { ok: true };
  }

  const name = sanitize(body.name);
  const contact = sanitize(body.contact);
  const projectType = sanitize(body.projectType);
  const message = sanitize(body.message);

  if (!name || !contact || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, contact, and message are required.',
    });
  }

  const config = useRuntimeConfig();
  const token = config.telegramBotToken;
  const chatId = config.telegramChatId;

  if (!token || !chatId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Telegram is not configured.',
    });
  }

  const text = [
    'New website request',
    '',
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Type: ${projectType || 'Not specified'}`,
    '',
    message,
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Telegram delivery failed.',
    });
  }

  return { ok: true };
});
