import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { submitContactAction } from "@/app/actions/contact";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about sizing, shipping or a pair? Talk to the Sole Studio team.",
};

type ContactSearchParams = Promise<{
  sent?: string | string[];
  error?: string | string[];
  name?: string | string[];
}>;

const inputClass =
  "mt-1.5 w-full rounded-field border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-brand-600 focus:ring-4 focus:ring-brand-200";
const labelClass = "text-[11px] font-bold uppercase tracking-[0.14em] text-ink";

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const errorMessages: Record<string, string> = {
  missing: "Please fill in all required fields so we know how to help.",
  email: "That email address doesn't look right. Please check it and try again.",
  message: "Tell us a little more — at least 10 characters, please.",
};

async function ContactStatus({
  searchParams,
}: {
  searchParams: ContactSearchParams;
}) {
  const params = await searchParams;
  const sent = firstValue(params.sent);
  const errorValue = firstValue(params.error);
  const firstName = firstValue(params.name);

  if (sent === "1") {
    return (
      <div
        role="status"
        className="mb-6 flex items-start gap-3 rounded-2xl border border-ink/35 bg-brand-50 px-4 py-3.5"
      >
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-sm font-bold text-ink">
            Thanks{firstName ? `, ${firstName}` : ""}! Your message is in.
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            A real human from the studio will get back to you within one
            business day.
          </p>
        </div>
      </div>
    );
  }

  if (errorValue) {
    return (
      <div
        role="alert"
        className="mb-6 rounded-2xl border border-ink/35 bg-brand-50 px-4 py-3.5 text-sm font-medium text-brand-800"
      >
        {errorMessages[errorValue] ??
          "Something went wrong. Please check your details and try again."}
      </div>
    );
  }

  return null;
}

const contactCards = [
  {
    icon: MailIcon,
    label: "Email us",
    value: "hello@solestudio.example",
    href: "mailto:hello@solestudio.example",
    note: "Best for order and sizing questions.",
  },
  {
    icon: PhoneIcon,
    label: "Call the studio",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
    note: "Mon–Sat, 10am–7pm ET.",
  },
  {
    icon: MapPinIcon,
    label: "Visit us",
    value: "42 Mercer Street, New York",
    href: "https://maps.google.com/?q=42+Mercer+Street+New+York",
    note: "Come try a pair on in person.",
  },
  {
    icon: ClockIcon,
    label: "Studio hours",
    value: "Mon–Sat 10–7 · Sun 12–5",
    href: null,
    note: "Closed on major holidays.",
  },
];

const faqs = [
  {
    question: "How do PUMA sizes run?",
    answer:
      "Most PUMA lifestyle pairs run true to size, while Suede and Palermo styles can feel slightly snug. If you're between sizes, size up. Message us with the model and we'll help.",
  },
  {
    question: "How fast will my order ship?",
    answer:
      "Orders placed before 2pm ET ship the same business day. Standard delivery takes 2–4 business days, and shipping is free on orders over $150.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You have 30 days to return unworn pairs in their original box. Contact us with your order number and we'll send a prepaid return label.",
  },
  {
    question: "Are the sneakers authentic?",
    answer:
      "Yes. Every pair is sourced through trusted partners and checked in-house before it ships. If something isn't right, we'll make it right.",
  },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams: ContactSearchParams;
}) {
  return (
    <main id="main-content">
      <section className="border-b border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
            <SparkleIcon className="h-3.5 w-3.5" />
            We&apos;re listening
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Talk to the studio.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Sizing second thoughts, delivery questions, or just want a
            recommendation? Send a note and a real human will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map((card) => {
                const content = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <card.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                        {card.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-ink">
                        {card.value}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {card.note}
                      </span>
                    </span>
                  </>
                );

                if (!card.href) {
                  return (
                    <div
                      key={card.label}
                      className="flex items-start gap-3 rounded-2xl border border-ink/25 bg-white p-4"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-start gap-3 rounded-2xl border border-ink/25 bg-white p-4 transition hover:border-ink/50 hover:bg-brand-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-card border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-100/50 p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-200/40 blur-2xl"
              />
              <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                Come say hi
              </p>
              <p className="relative mt-2 text-lg font-black tracking-tight text-ink">
                Try before you buy.
              </p>
              <p className="relative mt-2 max-w-xs text-sm leading-relaxed text-muted">
                Our Mercer Street studio carries the full rotation. Walk in,
                find your fit, walk out.
              </p>
              <Link
                href="https://maps.google.com/?q=42+Mercer+Street+New+York"
                target="_blank"
                rel="noreferrer"
                className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-ink/35 bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <MapPinIcon className="h-3.5 w-3.5 text-brand-600" />
                Get directions
              </Link>
            </div>
          </div>

          <div className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-8">
            <Suspense fallback={null}>
              <ContactStatus searchParams={searchParams} />
            </Suspense>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black tracking-tight text-ink">
                  Send a message
                </h2>
                <p className="mt-1 text-xs text-muted">
                  We reply within one business day.
                </p>
              </div>
              <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700 sm:inline-flex">
                Replies by humans
              </span>
            </div>

            <form action={submitContactAction} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Your name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    className={inputClass}
                  />
                </label>
                <label>
                  <span className={labelClass}>Email address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="jordan@example.com"
                    className={inputClass}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>What&apos;s this about?</span>
                  <select
                    name="subject"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    <option value="order">An order or delivery</option>
                    <option value="sizing">Sizing and fit</option>
                    <option value="returns">Returns or exchanges</option>
                    <option value="product">A specific pair</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Message</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    minLength={10}
                    placeholder="Tell us what you need. Include your order number if you have one."
                    className={`${inputClass} resize-y`}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-[11px] leading-relaxed text-muted">
                  By sending this, you agree to be contacted about your message.
                  <br className="hidden sm:block" />
                  We never share your details.
                </p>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Send message
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                Quick answers
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Before you ask.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              The things sneakerheads ask us most. If your question isn&apos;t
              here, the form above is the fastest route.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-ink/25 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-ink">
                  {faq.question}
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
