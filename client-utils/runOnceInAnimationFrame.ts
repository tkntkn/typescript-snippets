export function runOnceInAnimationFrame<T>(callback: (event: T) => void) {
  let request: number;
  return (event: T) => {
    cancelAnimationFrame(request);
    request = requestAnimationFrame(() => callback(event));
  };
}
