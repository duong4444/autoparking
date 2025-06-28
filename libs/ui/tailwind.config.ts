import type { Config } from 'tailwindcss';
import {
  colorsConfig,
  spacingConfig,
  animationConfig,
  keyframesConfig,
} from './src/styles/config';

const config: Config = {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: colorsConfig,

      ringColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      outlineColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      borderRadius: {
        DEFAULT: '0',
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
};
export default config;
