import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
