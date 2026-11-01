export function safeNextPath(value: unknown, fallback = "/account") {
  if (typeof value !== "string") {
    return fallback;
  }

  const path = value.trim();

  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    path.includes("\n") ||
    path.includes("\r")
  ) {
    return fallback;
  }

  return path;
}
