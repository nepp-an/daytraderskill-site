type IconProps = {
  className?: string;
  size?: number;
};

function iconAttrs({ className, size = 24 }: IconProps) {
  return {
    className,
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16.5H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M8 7h7M8 10.5h5" />
    </svg>
  );
}

export function PaperIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M8 3h8l4 4v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" />
      <path d="M15 3v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M12 3 20 6v6c0 4.4-3.2 7.7-8 9-4.8-1.3-8-4.6-8-9V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.8" />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L4 16.7 7.3 20l5.3-5.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.7-2.7 2.3-2.9Z" />
    </svg>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 7h8M8 11h2M12 11h2M16 11h.01M8 14.5h2M12 14.5h2M16 14.5h.01M8 18h2M12 18h2M16 18h.01" />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M12 3v18M7 21h10M4 7h16" />
      <path d="m6.5 7-3 6h6l-3-6ZM17.5 7l-3 6h6l-3-6Z" />
      <path d="M3.5 13a3 3 0 0 0 6 0M14.5 13a3 3 0 0 0 6 0" />
    </svg>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <rect x="4" y="4" width="16" height="17" rx="2.5" />
      <path d="m8 9 1.4 1.4L12 7.8M8 15l1.4 1.4L12 13.8M14.5 9.5H17M14.5 15.5H17" />
      <path d="M9 2v3M15 2v3" />
    </svg>
  );
}

export function JournalIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M4 8h16M8 12h8M8 15.5h5" />
      <path d="M4 5v14" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="M18 16.5 18.9 19l2.1.9-2.1.9-.9 2.2-.9-2.2-2.1-.9 2.1-.9.9-2.5Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <rect x="5" y="10" width="14" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...iconAttrs(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
