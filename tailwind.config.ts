import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // OPTION 6: Jost + Jost (Currently Active)
        'heading': ['Jost', 'sans-serif'],
        'body': ['Jost', 'sans-serif'],
        'elegant': ['Jost', 'sans-serif'],
        'sans': ['Jost', 'sans-serif'],
        
        // OPTION 1: Playfair Display + Montserrat (commented out)
        // 'heading': ['Playfair Display', 'serif'],
        // 'body': ['Montserrat', 'sans-serif'],
        // 'elegant': ['Playfair Display', 'serif'],
        // 'sans': ['Montserrat', 'sans-serif'],
        
        // OPTION 2: Raleway + Lato (commented out)
        // 'heading': ['Raleway', 'sans-serif'],
        // 'body': ['Lato', 'sans-serif'],
        // 'elegant': ['Raleway', 'sans-serif'],
        // 'sans': ['Lato', 'sans-serif'],
        
        // OPTION 3: Playfair Display + Inter (commented out)
        // 'heading': ['Playfair Display', 'serif'],
        // 'body': ['Inter', 'sans-serif'],
        // 'elegant': ['Playfair Display', 'serif'],
        // 'sans': ['Inter', 'sans-serif'],
        
        // OPTION 4: Cormorant Garamond + Poppins (commented out)
        // 'heading': ['Cormorant Garamond', 'serif'],
        // 'body': ['Poppins', 'sans-serif'],
        // 'elegant': ['Cormorant Garamond', 'serif'],
        // 'sans': ['Poppins', 'sans-serif'],
        
        // OPTION 5: Satoshi + Satoshi (Self-hosted - commented out)
        // 'heading': ['Satoshi', 'sans-serif'],
        // 'body': ['Satoshi', 'sans-serif'],
        // 'elegant': ['Satoshi', 'sans-serif'],
        // 'sans': ['Satoshi', 'sans-serif'],
        
        // OPTION 7: Playfair Display + Poppins
        // 'heading': ['Playfair Display', 'serif'],
        // 'body': ['Poppins', 'sans-serif'],
        // 'elegant': ['Playfair Display', 'serif'],
        // 'sans': ['Poppins', 'sans-serif'],
        
        // OPTION 8: Playfair Display + Inter
        // 'heading': ['Playfair Display', 'serif'],
        // 'body': ['Inter', 'sans-serif'],
        // 'elegant': ['Playfair Display', 'serif'],
        // 'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'pink': 'var(--shadow-pink)',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
      },
      transitionProperty: {
        'base': 'var(--transition-base)',
        'fast': 'var(--transition-fast)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "marquee-seamless": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-infinite": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-25%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "marquee": "marquee linear infinite",
        "marquee-seamless": "marquee-seamless linear infinite",
        "marquee-infinite": "marquee-infinite linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
