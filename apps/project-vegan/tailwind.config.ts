import sharedConfig from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  ...sharedConfig,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    '../../packages/ui/src/components/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
