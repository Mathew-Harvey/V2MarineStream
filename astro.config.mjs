import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.marinestream.com.au',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
