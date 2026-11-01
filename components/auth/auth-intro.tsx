import {
  BagIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/icons";

type AuthMode = "login" | "signup";

const copy = {
  login: {
    badge: "Members access",
    title: "Welcome back to the rotation.",
    description:
      "Sign in to open your account, keep your details handy, and get back to the pairs you were eyeing.",
    points: [
      {
        icon: ShieldIcon,
        title: "Secure sign-in",
        text: "Authentication is handled by Supabase, never by this app.",
      },
      {
        icon: BagIcon,
        title: "Your bag stays put",
        text: "The bag saved on this device is still there after you log in.",
      },
      {
        icon: UserIcon,
        title: "Your details",
        text: "Keep your account info ready for the next drop.",
      },
    ],
  },
  signup: {
    badge: "Join the studio",
    title: "Step into the rotation.",
    description:
      "Create an account to keep your details close, save time at checkout, and make the next pair yours.",
    points: [
      {
        icon: SparkleIcon,
        title: "A smoother checkout",
        text: "Your account details stay ready for the next pair.",
      },
      {
        icon: BagIcon,
        title: "Your bag, saved",
        text: "The bag on this device carries over when you sign in.",
      },
      {
        icon: ShieldIcon,
        title: "Secure by default",
        text: "Passwords are handled by Supabase Auth, not stored in this app.",
      },
    ],
  },
} satisfies Record<
  AuthMode,
  {
    badge: string;
    title: string;
    description: string;
    points: {
      icon: typeof ShieldIcon;
      title: string;
      text: string;
    }[];
  }
>;

export function AuthIntro({ mode }: { mode: AuthMode }) {
  const content = copy[mode];

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
        <SparkleIcon className="h-3.5 w-3.5" />
        {content.badge}
      </span>
      <h1 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
        {content.title}
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
        {content.description}
      </p>

      <ul className="mt-7 grid gap-3">
        {content.points.map((point) => {
          const Icon = point.icon;

          return (
            <li
              key={point.title}
              className="flex items-start gap-3 rounded-2xl border border-ink/25 bg-white/80 p-4 shadow-card"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">
                  {point.title}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                  {point.text}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-2xl border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-50/60 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
          Good to know
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">
          This is a demo store. No real orders or payments are processed, and
          your bag is stored only in a cookie on this device.
        </p>
      </div>
    </div>
  );
}
