import type { Metadata } from 'next';
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


/** Attach self-canonical Open Graph / Twitter fields so pages do not inherit the layout homepage URL or default title. */
export function withPageOg(meta: Metadata): Metadata {
  const canonical = meta.alternates?.canonical;
  const path = typeof canonical === 'string' ? canonical : '/';
  const rawTitle = meta.title;
  let title = '';
  if (typeof rawTitle === 'string') {
    title = rawTitle;
  } else if (rawTitle && typeof rawTitle === 'object' && 'absolute' in rawTitle && rawTitle.absolute) {
    title = String(rawTitle.absolute);
  } else if (rawTitle && typeof rawTitle === 'object' && 'default' in rawTitle && rawTitle.default) {
    title = String(rawTitle.default);
  }
  const description = typeof meta.description === 'string' ? meta.description : '';
  return {
    ...meta,
    openGraph: {
      title,
      description,
      url: path,
      ...meta.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...meta.twitter,
    },
  };
}
