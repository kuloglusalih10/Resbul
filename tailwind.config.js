/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {
    extend: {
      colors: {
        'ligth-red' : '#F6B7B7', // %45
        'dark-red': '#FD0F0F',
        'background' :'#fafafa',
        'ligth-gray' : '#959292', // %20
        'dark-gray': '#1c1e23',   // %80
        'ligth-blue' : '#32ACFF', // %22
        'dark-blue' : '#32ACFF',
        'ligth-orange' : '#FDA574',  // %60
        'dark-orange' : '#FC6F20',
        'light-purple' : '#DDE2FF',  // %62
        'dark-purple' : '#0025FB',
        'ligth-green' : '#9BF09D', // %10
        'middle-green' : '#A2F69B',
        'dark-green' : '#19D508',
        'main' : '#f8fafc'
        
      }
    },
  },
  plugins: [],
}

