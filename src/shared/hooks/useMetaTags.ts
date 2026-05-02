import { useEffect } from 'react';

interface MetaTagsOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useMetaTags({ title, description, image, url }: MetaTagsOptions) {
  useEffect(() => {
    const siteTitle = 'The Nail Artistry';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const pageUrl = url || window.location.href;

    if (title) document.title = fullTitle;

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
      setMeta('twitter:description', description);
    }

    setMeta('og:title', fullTitle, true);
    setMeta('twitter:title', fullTitle);
    setMeta('og:url', pageUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');

    if (image) {
      setMeta('og:image', image, true);
      setMeta('twitter:image', image);
    }
  }, [title, description, image, url]);
}
