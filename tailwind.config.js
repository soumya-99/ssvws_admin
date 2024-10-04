/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
      extend: {
        backgroundImage: {
          'hello': "url('Assets/Images/hello.png')",
          'hellooffice': "url('Assets/Images/hellooffice.png')",
        },
        backgroundColor:{
          emerald:{
            50 		: '#e8fcf9',
            100		:'#d1faf4',
            200		: '#14b89f',
            300 	:	'#12a18b',
            400 	:	'#3eb67e',
            500 	:	'#347865',
            600 	:	'#0a5c50',
            700		:'#08453c',   
            800 	: '#052d27',
            900 	: '#031714'
          }
        },
        colors:{
          emerald:{
            50 		: '#e8fcf9',
            100		:'#d1faf4',
            200		: '#14b89f',
            300 	:	'#12a18b',
            400 	:	'#3eb67e',
            500 	:	'#347865',
            600 	:	'#0a5c50',
            700		:'#08453c',
            800 	: '#052d27',
            900 	: '#031714'
          }
        },
       
      },
  },
  plugins: [require('flowbite/plugin')({
    charts: true,
}),],
}

