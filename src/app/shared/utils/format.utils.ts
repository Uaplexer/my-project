export function toCamelCase(value: string): string {
  return value
    .replace(/[()]/g, '')
    .split(/[\s-]/g)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
}
