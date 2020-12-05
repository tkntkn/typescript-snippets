import { useEffect, EffectCallback, DependencyList } from "react";

type AsyncEffectCallback = () => Promise<ReturnType<EffectCallback>>;

export function useAsyncEffeect(
  callback: AsyncEffectCallback,
  deps?: DependencyList
) {
  useEffect(() => {
    const promise = callback();
    return () => void promise.then((cleanup) => cleanup && cleanup());
  }, deps);
}
