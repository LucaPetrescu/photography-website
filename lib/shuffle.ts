/**
 * Uniform Fisher–Yates shuffle. Returns a new array and leaves the input
 * untouched, so it is safe on arrays from a cache, props or module constants.
 */
export function shuffled<T>(items: readonly T[]): T[] {
  const out = [...items];

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
}
