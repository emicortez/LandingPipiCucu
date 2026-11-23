/** Deterministic, uneven rotations so prints look laid by hand, never in a repeating pattern. */
const TILTS = [-2.2, 1.6, -1, 2.4, -2.8, 0.8, 1.9, -1.6];

export function tiltFor(index: number): number {
  return TILTS[index % TILTS.length];
}
