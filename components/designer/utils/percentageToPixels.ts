export function percentageToPixels(
  value: string,
  total: number
): number {
  if (value.endsWith("%")) {
    return (
      (parseFloat(value) / 100) *
      total
    );
  }

  return parseFloat(value);
}