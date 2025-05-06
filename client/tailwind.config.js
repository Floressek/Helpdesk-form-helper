const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: defaultTheme.colors, // <- dodaj to, jeśli używasz Tailwind 4
        },
    },
    darkMode: 'class',
    plugins: [],
}
