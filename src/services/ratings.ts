// Shared rating utilities and mock generators

export type SkinRating = {
  date: string;     // ISO date: YYYY-MM-DD
  rating: number;   // 1..10
  notes?: string;
};

export function toISODate(d: Date): string {
  return d.toISOString().split('T')[0];
}

// Generate stable mock daily ratings for the last 7 entries (most recent first)
export function generateMockRatings(): SkinRating[] {
  const today = new Date();
  const baseRatings = [8, 7, 7, 6, 8, 7, 6]; // deterministic sample over 7 recent entries
  return baseRatings.map((rating, idx) => {
    const d = new Date(today.getTime() - idx * 24 * 60 * 60 * 1000);
    return { date: toISODate(d), rating, notes: '' };
  });
}

// Given a list of photos with (date, skinRating), average multiple photos per day
export function dailyAverageFromPhotos(photos: { date: string; skinRating: number }[]): SkinRating[] {
  const map = new Map<string, { sum: number; count: number }>();
  for (const p of photos) {
    const day = p.date;
    const prev = map.get(day) ?? { sum: 0, count: 0 };
    prev.sum += p.skinRating;
    prev.count += 1;
    map.set(day, prev);
  }
  const daily: SkinRating[] = [];
  for (const [date, agg] of map.entries()) {
    daily.push({ date, rating: +(agg.sum / agg.count).toFixed(1) });
  }
  // sort descending by date (most recent first)
  daily.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return daily;
}

// Compute rolling average over the last N daily entries (skip missing days)
// Assumes input dailyRatings may be unordered; we will sort descending and take first N
export function rollingAverageLastNDays(dailyRatings: SkinRating[], n: number): number {
  if (!dailyRatings.length || n <= 0) return 0;
  const sorted = [...dailyRatings].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const slice = sorted.slice(0, n);
  const sum = slice.reduce((acc, r) => acc + r.rating, 0);
  return +(sum / slice.length).toFixed(1);
}

// Convenience: compute 7-day rolling average directly from photos
export function sevenDayAverageFromPhotos(photos: { date: string; skinRating: number }[]): number {
  const daily = dailyAverageFromPhotos(photos);
  return rollingAverageLastNDays(daily, 7);
}