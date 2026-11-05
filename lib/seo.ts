import { BRAND, SITE_ORIGIN } from '@/lib/site';

type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished = '2026-11-05',
  dateModified = '2026-11-05',
}: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: BRAND,
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      url: SITE_ORIGIN,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}${path}`,
    },
  };
}
