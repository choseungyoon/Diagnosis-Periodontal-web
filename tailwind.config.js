/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        amber: { 700: "var (--amber_700)", "700_19": "var(—-amber_700_19）"},
        black: { 900: "var(--black_900)", "900_7": "var(--black_900_7f)" }, blue: { 50: "var(--blue_50)", 100: "var(--blue_100)" },
        blue_gray: {
          50: "var(--blue_gray_50)",
          100: "var(--blue_gray_100)",
          800: "var(--blue_gray_800)",
          900: "var(--blue_gray_900)",
          "50_01": "var(--blue_gray_50_01)",
        },
        gray:{
          50: "var(--gray_50)",
          200: "var(--gray_200)",
          500: "var(--gray_500)",
          600: "var (--gray_600)",
          700: "var(--gray_700)",
          800: "var(--gray_800)",
          900: "var(--gray_900)",
          "200_19": "var(--gray_200_19)",
          "50_01": "var(--gray_50_01)",
          "50_02": "var(--gray_50_02)",
          "50_33": "var(--gray_50_33)",
          "50_7f": "var(--gray_50_7f)",
          "600_01": "var(--gray_600_01)",
          "700_01": "var(--gray_700_01)",
          "900_01": "var(--gray_900_01)",
          "900_0с": "var(--gray_900_0c)",
          "900_14": "var(--gray_900_14)",
        },
        green: {
          50: "var(--green_50)",
          400: "var(--green_400)",
          900: "var(--green_900)",
          "400_01": "var(--green_400_01)",
        },
        indigo: { 50: "var(--indigo_50)", 900: "var(--indigo_900)", "50_01": "var(-indigo_50_01)" },
        light_blue: {
          800: "var(--light_blue_800)",
          "800_19": "var(--light_blue_800_19)",
          a700: "var(--light_blue_a700)",
          a700_01: "var(--light_blue_a700_01) ",
          a700_14: "var(--light_blue_a700_14) ",
          a700_19: "var(--light_blue_a700_19)",
        },
        red: { 400: "var(--red__400)", "400_01": "var(--red__400_01)", "400_19": "var(--red_400_19) "},
        teal: { 50: "var(--teal_50)", 600:"var(--teal_600)", 800: "var(-teal_800)" },
        white: {
          a700: "var(--white_a700)",
          a700_19: "var(--white_a700_19)",
          a700_1e: "var(--white_a700_1e)",
          a700_26: "var(--white_a700_26)" ,
          a700_33: "var(--white_a700_33)",
          a700_cc: "var(--white_a700_cc)",
        },
      },
      boxShadow: { xs: "O 1px 2px 0 #1018280c", sm: "0 2px 6px #0d0a2c14" },
      fontFamily : {suit: "SUIT" , patuaone: "Patua One"},
      backgroundImage : {gradient: "linear-gradient(90deg,#f8f8ff33,#f8f8ff)"},
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #ebf8ff 0%, #bee3f8 100%)',
      },
      borderRadius: {
        'custom': '0 0 100px 100px',
      },
    },
  },
  plugins: [],
}

