export function getPreviousElement(target: Element): Element {
  if (!target) {
    return null
  } else if (target.previousElementSibling) {
    return target.previousElementSibling;
  } else {
    return getPreviousElement(target.parentElement)
  }
}
