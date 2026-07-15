import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.marinestream.com.au',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  redirects: {
    '/blog': '/news',
    '/portfolio': '/news',
    '/sales': '/services',
    '/sales/hardware': '/services/hardware',
    '/sales/software': '/services/software',
    '/sales/training': '/services/training',
    '/sales/professional-services': '/services/professional-services',
  },
});
