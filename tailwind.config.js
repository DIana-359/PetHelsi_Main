import { heroui } from "@heroui/react";
import { colorPallete } from "./colorPallete";
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        min:"375px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      keyframes: {
        sizeUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        sizeUp: "sizeUp 0.8s ease-out",
      },
      colors: colorPallete,
      // spacing: {
      //   pxClamp: "clamp(16px, 5vw, 72px)",
      // },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: colorPallete,
        },
      },
      // components: {
      //   input: {
      //     variants: {
      //       bordered: {
      //         base: "shadow-none",
      //         inputWrapper: "border-primary-300 hover:border-primary focus-within:border-primary shadow-none",
      //         input: "shadow-none"
      //       }
      //     }
      //   },
      //   select: {
      //     variants: {
      //       bordered: {
      //         base: "shadow-none",
      //         trigger: "border-primary-300 hover:border-primary focus:border-primary shadow-none",
      //         value: "shadow-none",
      //       }
      //     },
      //     listbox: {
      //       base: "",
      //       list: "",
      //       emptyContent: "",
      //       item: {
      //         base: `
      //       data-[selected=true]:bg-primary-100 
      //       data-[selected=true]:text-primary-600
      //       hover:bg-primary-50
      //       hover:text-primary-700
      //       transition-colors duration-200
      //     `,
      //     selectedIcon: "text-primary-900",
      //       }
      //     }
      //   },
      //   button: {
      //     variants: {
      //       bordered: {
      //         base: "shadow-none"
      //       }
      //     }
      //   }
      // }
    }),
    scrollbar()
  ],
};

// text-[14px] font-[400] leading-[1.4] text-gray-700 text-center 2xl:text-left