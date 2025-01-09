const sharedConfig = require('@repo/ui/tailwind.config');

module.exports = {
  ...sharedConfig,
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}', // Astro app files
    '@repo/ui/**/*.{js,ts,jsx,tsx}',         // Shared components
  ],
};
