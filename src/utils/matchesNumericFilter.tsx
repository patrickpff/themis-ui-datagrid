export function matchesNumericFilter(value: number, filter: string): boolean {
  const f = filter.trim();

  // range
  const range = f.match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) {
    const min = Number(range[1]);
    const max = Number(range[2]);

    return value >= min && value <= max;
  }

  // >=
  if (f.startsWith(">=")) {
    return value >= Number(f.slice(2));
  }

  // >
  if (f.startsWith(">")) {
    return value > Number(f.slice(1));
  }

  // <=
  if (f.startsWith("<=")) {
    return value <= Number(f.slice(2));
  }

  // <
  if (f.startsWith("<")) {
    return value < Number(f.slice(1));
  }

  // exact match
  return value === Number(f);
}
