"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/components/icons";

const labelClass = "text-[11px] font-bold uppercase tracking-[0.14em] text-ink";
const inputClass =
  "w-full rounded-field border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-brand-600 focus:ring-4 focus:ring-brand-200";

type PasswordInputProps = {
  name: string;
  label: string;
  autoComplete: string;
  placeholder: string;
  minLength?: number;
};

export function PasswordInput({
  name,
  label,
  autoComplete,
  placeholder,
  minLength,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label>
      <span className={labelClass}>{label}</span>
      <span className="relative mt-1.5 block">
        <LockIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-700" />
        <input
          type={visible ? "text" : "password"}
          name={name}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${inputClass} pl-11 pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-brand-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </span>
    </label>
  );
}
