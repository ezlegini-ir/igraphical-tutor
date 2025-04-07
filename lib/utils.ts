import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-jalaali";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateFileName(name: string, maxLength = 20) {
  if (name.length <= maxLength) return name;

  const extIndex = name.lastIndexOf(".");
  const extension = extIndex !== -1 ? name.slice(extIndex) : "";
  const baseName = name.slice(0, extIndex);

  return baseName.slice(0, 10) + "....." + baseName.slice(-10) + extension;
}

export function formatPrice(
  price: number | undefined,
  options?: { noValuePlaceholder?: string; showNumber?: boolean }
) {
  if (!price)
    return options?.showNumber ? 0 + " t" : options?.noValuePlaceholder || "--";

  return price.toLocaleString("en-US") + " t";
}

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

interface FormatDateOptions {
  withTime?: boolean;
  useMonthName?: boolean;
  format?: string;
}

export function formatDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const { withTime = false, useMonthName = true, format } = options;

  let dateFormat = useMonthName ? "jDD jMMMM jYYYY" : "jYYYY/jMM/jDD";
  if (withTime) dateFormat += " - HH:mm";

  return moment(date).format(format || dateFormat);
}

export function smartFormatDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const now = moment();
  const input = moment(date);

  const diffInDays = now.diff(input, "days");

  if (diffInDays < 4) {
    return input.fromNow();
  } else {
    return formatDate(date, options);
  }
}
