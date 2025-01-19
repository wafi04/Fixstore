export function FormatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function FormatDateWithOptions(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "id-ID"
): string {
  const formattedDate = new Date(date);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const formatter = new Intl.DateTimeFormat(locale, mergedOptions);
  return formatter.format(formattedDate);
}
