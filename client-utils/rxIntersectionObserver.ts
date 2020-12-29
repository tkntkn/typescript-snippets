type Entry = [IntersectionObserverEntry, IntersectionObserverEntry];

export interface RxIntersectionObserver {
  observe(target: Element): Subject<Entry>;
  unsubscribe(): void;
}

export function rxIntersectionObserver(option: IntersectionObserverInit): RxIntersectionObserver {
  const subjects = new Map<Element, Subject<Entry>>();
  const previousEntries = new Map<Element, IntersectionObserverEntry>();
  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      const previousEntry = previousEntries.get(entry.target);
      subjects.get(entry.target).next([entry, previousEntry]);
      previousEntries.set(entry.target, entry);
    }
  }, option);

  const subscription = new Subscription();

  function observe(target: Element) {
    const subject = new Subject<Entry>();
    subjects.set(target, subject);
    observer.observe(target);
    return subject;
  }

  function unsubscribe() {
    subscription.unsubscribe();
    observer.disconnect();
  }

  return { observe, unsubscribe };
}
