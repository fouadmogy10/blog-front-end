/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "white",
          "h3":{
            color:"black"
          }
        },
      },
      {
        black: {
          ...require("daisyui/src/theming/themes")["[data-theme=black]"],
          background: "linear-gradient(180deg, rgba(5,24,79,1) 1%, rgba(0,0,0,1) 65%)",
          
          primary: "black",
          "h3":{
            color:"white"
          }
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
