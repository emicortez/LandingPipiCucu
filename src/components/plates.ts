import type { Work } from '../data/demo';

/** Plate number of a work: its position in the published catalog order, zero-padded ("05"). */
export function plateNumber(works: Work[], work: Work): string {
  const index = works.findIndex((w) => w._id === work._id);
  return String(index < 0 ? 0 : index + 1).padStart(2, '0');
}

/** Shared view-transition name linking a work's card plate to the plate on its ficha. */
export function plateTransitionName(slug: string): string {
  return `plate-${slug.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}
