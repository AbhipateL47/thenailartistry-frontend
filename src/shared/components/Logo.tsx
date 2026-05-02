import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo = ({ className = '', variant = 'dark' }: LogoProps) => {
  const textPrimary   = variant === 'dark' ? '#FFFFFF' : '#111111';
  const textSecondary = variant === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)';

  return (
    <Link to="/" className={`flex items-center shrink-0 ${className}`} aria-label="The Nail Artistry">
      <svg
        viewBox="0 0 186 40"
        className="h-9 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nailFill" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#FF8FB3" />
            <stop offset="55%"  stopColor="#DD2C6C" />
            <stop offset="100%" stopColor="#A81E55" />
          </linearGradient>
          <linearGradient id="nailFillB" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#FF8FB3" />
            <stop offset="55%"  stopColor="#DD2C6C" />
            <stop offset="100%" stopColor="#A81E55" />
          </linearGradient>
        </defs>

        {/* ── Three nail icon ── */}
        {/* Center nail (tallest) */}
        <path
          d="M20 2C20 2 15.5 5.5 15 13C14.5 21.5 17 30 20 33C23 30 25.5 21.5 25 13C24.5 5.5 20 2 20 2Z"
          fill="url(#nailFill)"
        />
        {/* Gloss highlight on center nail */}
        <path
          d="M17.5 5C17 8 16.5 13.5 17 18"
          stroke="rgba(255,255,255,0.38)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Left nail (shorter, angled) */}
        <path
          d="M10 6C10 6 6.5 9 6.5 15C6.5 21 9 27 11.5 29.5C14 26.5 15 20.5 14.5 14.5C14 9 10 6 10 6Z"
          fill="#DD2C6C"
          opacity="0.65"
        />

        {/* Right nail (shorter, angled) */}
        <path
          d="M30 6C30 6 33.5 9 33.5 15C33.5 21 31 27 28.5 29.5C26 26.5 25 20.5 25.5 14.5C26 9 30 6 30 6Z"
          fill="#DD2C6C"
          opacity="0.65"
        />

        {/* Small diamond accent below nails */}
        <path
          d="M20 36L17.5 33.5L20 31L22.5 33.5Z"
          fill="#DD2C6C"
          opacity="0.8"
        />

        {/* ── Wordmark ── */}
        {/* "the" — small light italic */}
        <text
          x="46"
          y="15"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fontSize="9"
          fontStyle="italic"
          fontWeight="400"
          fill={textSecondary}
          letterSpacing="1.5"
        >
          the
        </text>

        {/* Decorative line between "the" and main text */}
        <line x1="46" y1="18.5" x2="186" y2="18.5" stroke={textSecondary} strokeWidth="0.4" opacity="0.5" />

        {/* "NAIL ARTISTRY" — bold sans */}
        <text
          x="46"
          y="34"
          fontFamily="'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', sans-serif"
          fontSize="16"
          fontWeight="800"
          fill={textPrimary}
          letterSpacing="2"
        >
          NAIL ARTISTRY
        </text>
      </svg>
    </Link>
  );
};
