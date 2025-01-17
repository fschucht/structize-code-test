import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function isServer(): boolean {
  return !isClient();
}
