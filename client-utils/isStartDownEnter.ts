// TODO: Test
function isStartDownEnter(current: IntersectionObserverEntry, previous: IntersectionObserverEntry): [boolean, boolean, boolean] {
  const currentY = current.boundingClientRect.y;
  const previousY = previous.boundingClientRect.y;
  const currentRatio = current.intersectionRatio;
  const previousRatio = previous.intersectionRatio;
  const isIntersecting = current.isIntersecting;

  const start = currentRatio !== 1;

  if (currentY < previousY) {
    if (currentRatio > previousRatio && isIntersecting) {
      return [start, true, true];
    } else {
      return [start, true, false];
    }
  } else if (currentY > previousY && isIntersecting) {
    if (currentRatio < previousRatio) {
      return [start, false, false];
    } else {
      return [start, false, true];
    }
  }

  return [undefined, undefined, undefined];
}
