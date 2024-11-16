import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '976px',
  		xl: '1440px'
  	},
  	extend: {
  		colors: {
  			background: 'var(--primary)',
  			foreground: 'var(--foreground)',
  			primary: {
  				DEFAULT: 'var(--primary)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)'
  			},
  			accent: {
  				blue: 'var(--accent-blue)',
  				green: 'var(--accent-green)',
  				red: 'var(--accent-red)'
  			},
  			white: 'var(--white)',
  			black: 'var(--black)',
        text: {
          DEFAULT: 'var(--black)',
          half: 'var(--text-half-opacity)'
        }
  		},
  		fontFamily: {
  			poppins: ["var(--font-poppins)"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
