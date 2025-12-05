import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge for consistent styling
 * @param inputs - Class values to merge
 * @returns Merged class string with Tailwind classes properly merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a 10-digit phone number as (XXX) XXX-XXXX
 * @param phone - Raw phone number string
 * @returns Formatted phone number or null if invalid
 */
export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}
