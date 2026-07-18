export const contactEmail = 'hello@example.com';

export const contactHref = `mailto:${contactEmail}`;

export const telegramHref = 'https://t.me/aptashenko';

export const profilePhoto = '/me.png';

export type SocialLinkId = 'linkedin' | 'instagram' | 'github' | 'threads';

export const socialLinks: Array<{
  id: SocialLinkId;
  label: string;
  href: string;
}> = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/your-profile',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/your-profile',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/your-profile',
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.net/@your-profile',
  },
];
