import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRightIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function BagIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function ChatIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M5 5.5h14a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-7l-5 3.5v-3.5H5A2.5 2.5 0 0 1 2.5 15V8A2.5 2.5 0 0 1 5 5.5Z" />
      <path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      <path d="m4.5 8 6.6 4.6a1.6 1.6 0 0 0 1.8 0L19.5 8" />
    </svg>
  );
}

export function EyeIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M2.8 12S6.3 5.5 12 5.5 21.2 12 21.2 12 17.7 18.5 12 18.5 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M10.6 6.1A10.8 10.8 0 0 1 12 6c5.7 0 9.2 6 9.2 6a17 17 0 0 1-3 3.5" />
      <path d="M6.2 7.7A17.3 17.3 0 0 0 2.8 12S6.3 18 12 18a10.7 10.7 0 0 0 4.2-.8" />
      <path d="m3.5 3.5 17 17" />
    </svg>
  );
}

export function LockIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="3" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <path d="M12 14v2.5" />
    </svg>
  );
}

export function LogOutIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10" />
      <path d="M14 8l4 4-4 4M18 12H9" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MinusIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M7.5 3.8 9.8 8l-2 1.7a14 14 0 0 0 6.5 6.5l1.7-2 4.2 2.3-.7 2.4a2 2 0 0 1-2.2 1.3C10.4 19.2 4.8 13.6 3.8 6.7A2 2 0 0 1 5.1 4.5l2.4-.7Z" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function RefreshIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M20 11a8 8 0 1 0-2.3 6.1" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function SendIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="m4 4 17 8-17 8 3.2-8L4 4Z" />
      <path d="M7.2 12H21" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M12 3.5 19 6v5.4c0 4.5-2.9 7.8-7 9.1-4.1-1.3-7-4.6-7-9.1V6l7-2.5Z" />
      <path d="m8.7 12 2.2 2.2 4.4-4.4" />
    </svg>
  );
}

export function SparkleIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M12 3.5c.7 4.5 2 5.8 6.5 6.5-4.5.7-5.8 2-6.5 6.5-.7-4.5-2-5.8-6.5-6.5 4.5-.7 5.8-2 6.5-6.5Z" />
      <path d="M18.5 16.5c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M12 3.6l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z" />
    </svg>
  );
}

export function TruckIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M3 6.5h10.5v10H3z" />
      <path d="M13.5 10h4l3 3v3.5h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  );
}
