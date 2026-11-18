const dateFormat = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Istanbul",
});

export function formatDate(iso: string | null | undefined) {
  return iso ? dateFormat.format(new Date(iso)) : "";
}
