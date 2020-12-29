export function *enumerate<T>(iterable: Iterable<T>) {
  let index = 0;
  for (const item of iterable) {
    yield [index++, item] as const;
  }
}
