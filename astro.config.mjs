import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.marinestream.com.au',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    server: {
      watch: {
        // Large design-export HTML mocks lock under OneDrive and crash the watcher.
        ignored: ['**/MarineStream *.html', '**/_*.html'],
      },
    },
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
