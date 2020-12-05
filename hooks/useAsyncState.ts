import { useState, useCallback } from "react";
import { useAsyncEffeect } from "./useAsyncEffect";
import { NotFunction } from "../type-utils/NotFunction";
import { MaybePromise } from "../type-utils/MaybePromise";

type InitialAsyncState<S> =
  | NotFunction<MaybePromise<S>>
  | (() => MaybePromise<S>);

function isInitializerFunctioin<S>(
  initialAsyncState?: InitialAsyncState<S>
): initialAsyncState is () => MaybePromise<S> {
  return typeof initialAsyncState === "function";
}

export function useAsyncState<S>(initialAsyncState?: InitialAsyncState<S>) {
  const [state, setState] = useState<S>();

  useAsyncEffeect(async () => {
    const initialState = isInitializerFunctioin(initialAsyncState)
      ? await initialAsyncState()
      : await initialAsyncState;
    setState(initialState);
  }, []);

  const asyncSetState = useCallback(
    async (asyncAction) => {
      const newState =
        typeof asyncAction === "function"
          ? await asyncAction(state)
          : await asyncAction;
      setState(newState);
    },
    [state]
  );

  return [state, asyncSetState] as const;
}
