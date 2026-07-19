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
    href: 'https://www.linkedin.com/in/aptashenko',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/a_ptashenko',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'http://github.com/aptashenko',
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.com/@a_ptashenko',
  },
];
