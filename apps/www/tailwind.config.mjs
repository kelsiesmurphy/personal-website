import sharedConfig from '@repo/ui/tailwind.config';

export default {
  ...sharedConfig,
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}', // Astro app files
    '../../packages/ui/src/components/**/*.{js,ts,jsx,tsx}', // Shared components
  ],
};
