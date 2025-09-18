import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

export const getScoreStyle = (score: number) => {
  let badgeText = "";
  let badgeColor = "";
  let textColor = "";

  if (score >= 70) {
    badgeText = "Strong";
    badgeColor = "bg-badge-green";
    textColor = "text-green-600";
  } else if (score >= 50) {
    badgeText = "Good Start";
    badgeColor = "bg-badge-yellow";
    textColor = "text-yellow-600";
  } else {
    badgeText = "Needs Work";
    badgeColor = "bg-badge-red";
    textColor = "text-red-600";
  }

  return { badgeText, badgeColor, textColor };
};
