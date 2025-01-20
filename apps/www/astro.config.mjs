import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

import lenis from "astro-lenis";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://kelsiesmurphy.com",
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), mdx(), lenis()],
  redirects: {
    '/projects': '/projects/earth'
  }
});