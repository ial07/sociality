import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toRelativeTime = (
  date: string | Date | undefined,
  withoutSuffix: boolean = false
): string => {
  if (!date) return "";
  return dayjs(date).fromNow(withoutSuffix);
};