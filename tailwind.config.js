/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  // content: ["./app/**/*.{js,jsx,ts,tsx}"]
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",  
    "./src/**/*.{js,jsx,ts,tsx}",                    // Main App component
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in components folder
  ],
  
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}