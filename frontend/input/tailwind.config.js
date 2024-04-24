/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // for phones
        'md': '768px',  // for tabletes, larger phones
        'lg': '1024px', // for desktop
        // For some of the pages, set max-width: 1280px
      },  
      fontFamily:{
        "title": ['Kodchasan', "Calibri", "Arial", " Helvetica", 'sans-serif'],
        "content": ["MavenPro", "Calibri","Arial", " Helvetica",'sans-serif'],
        "monofett": ["Monofett"],
      },
      fontSize: {
        'h0': '4.5rem', 
        'h1': '3.5rem', 
        'h2': '2.6rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        "small1":"0.875rem",
        'hint': '0.75rem',
      },
      colors:{  
        "narrativeColor":{
          1: '##F1F1F1',
          2: '#C1AEA8',
          3: '#AD918A',
          4: '#88685E',
          5: '#755349',
          6: '#3A1E16',
          7: '#3C1C12',
          8: '#2B140D',
          9: '#110400',
        },
        "gray": {
          1: "#f1f3f5",
          2: "#dee2e6",
          3: "#ced4da",
          4: "#adb5bd",
          5: "#868e96",
          6: "#495057",
          7: "#343a40",
          8: "#212529",
        },
        "purple": {
          1: "#f3d9fa",
          2: "#f3c4fb",
          3: '#da77f2',
          4: '#cc5de8',
          5: '#ae3ec9',
          6: '#9c36b5',
          7: '#862e9c',
          8: "#640493",
        },
      },
      boxShadow:{
        "light-all": "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        "think-card": "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        "ball": "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
      }
    },
  },
  plugins: [require("daisyui")],
    // daisyUI config (optional - here are the default values)
    daisyui: {
      themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "light", // name of one of the included themes for dark mode
      base: false, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
      themeRoot: ":root", // The element that receives theme color CSS variables
    },
}