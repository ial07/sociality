import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const textSizes = {
  "display-3xl": "--text-display-3xl",
  "display-2xl": "--text-display-2xl",
  "display-xl": "--text-display-xl",
  "display-lg": "--text-display-lg",
  "display-md": "--text-display-md",
  "display-sm": "--text-display-sm",
  "display-xs": "--text-display-xs",
  "text-xl": "--text-xl",
  "text-lg": "--text-lg",
  "text-md": "--text-md",
  "text-sm": "--text-sm",
  "text-xs": "--text-xs",
};

const fontWeights = {
  regular: "--font-weight-regular",
  medium: "--font-weight-medium",
  semibold: "--font-weight-semibold",
  bold: "--font-weight-bold",
  extrabold: "--font-weight-extrabold",
};

const customTextPlugin = plugin(({ addUtilities }) => {
  const newUtilities: Record<string, any> = {};

  for (const [sizeName, sizeVar] of Object.entries(textSizes)) {
    for (const [weightName, weightVar] of Object.entries(fontWeights)) {
      const className = `.${sizeName}-${weightName}`;
      newUtilities[className] = {
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${sizeVar}--line-height)`,
        fontWeight: `var(${weightVar})`,
      };
    }
  }

  addUtilities(newUtilities);
});

export default {
  theme: {
    extend: {
      boxShadow: {
        "all-sides":
          "0 0 5px 0 rgba(0, 0, 0, 0.1), 0 5px 10px 0px rgba(0, 0, 0, 0.06)",
        "top-and-bottom":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        "fluid-vertical": "clamp(5rem, 10vw, 15rem)",
      },
    },
  },
  plugins: [customTextPlugin],
} satisfies Config;
