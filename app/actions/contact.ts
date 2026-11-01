"use server";

import { redirect } from "next/navigation";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactAction(formData: FormData) {
  const name = text(formData, "name").slice(0, 120);
  const email = text(formData, "email").slice(0, 180);
  const subject = text(formData, "subject").slice(0, 120);
  const message = text(formData, "message").slice(0, 2000);

  if (!name || !email || !subject || !message) {
    redirect("/contact?error=missing");
  }

  if (!emailPattern.test(email)) {
    redirect("/contact?error=email");
  }

  if (message.length < 10) {
    redirect("/contact?error=message");
  }

  const firstName = name.split(" ")[0] || "friend";
  const params = new URLSearchParams({
    sent: "1",
    name: firstName,
  });

  redirect(`/contact?${params.toString()}`);
}
