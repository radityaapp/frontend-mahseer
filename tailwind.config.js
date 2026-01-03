/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "hijau-lime": "#D6E264",
        "biru-nila": "#3652A5",
        "biru-muda": "#89BCD9",
        "biru-muda-2": "#EDF8FF",
        "biru-tua": "#17366E",
        "biru-tua-2": "#0e1d36ff",
      },

      animation: {
        scroll: "scroll 40s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
