import { type ClassValue, clsx } from 'clsx';

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date for display
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Calculate percentage for progress rings
export function calculatePercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Check if running in browser
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Get streak emoji based on count
export function getStreakEmoji(count: number): string {
  if (count >= 30) return '🏆';
  if (count >= 21) return '💎';
  if (count >= 14) return '🔥';
  if (count >= 7) return '⭐';
  if (count >= 3) return '💪';
  return '🌱';
}

// Get encouraging message based on streak
export function getStreakMessage(count: number): string {
  if (count >= 30) return 'Incredible dedication!';
  if (count >= 21) return 'You are unstoppable!';
  if (count >= 14) return 'Amazing consistency!';
  if (count >= 7) return 'Great momentum!';
  if (count >= 3) return 'Building the habit!';
  if (count >= 1) return 'Great start!';
  return 'Begin your journey!';
}
