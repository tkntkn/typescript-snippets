import { DependencyList, useCallback, useState } from "react";
import { MaybePromise } from "../type-utils/MaybePromise";
import { OneOrNoneOf } from "../type-utils/OneOrNoneOf";
import { Unpromise } from "../type-utils/Unpromise";

type ActionResult<T, E> = OneOrNoneOf<{ data: T; error: E }>;
type ActionState<T, E> = ActionResult<T, E> & { loading: boolean };

export function useAsyncAction<
  T extends (...params: any) => MaybePromise<unknown>,
  E extends Error
>(action: T, deps: DependencyList) {
  type DataType = Unpromise<ReturnType<T>>;

  const [state, setState] = useState<ActionState<DataType, E>>({
    data: undefined,
    error: undefined,
    loading: false
  });

  const dispatch = useCallback(async (...params: Parameters<T>) => {
    setState((state) => ({ ...state, loading: true }));
    try {
      const data = (await action(...params)) as DataType;
      setState((state) => ({ ...state, data, error: undefined }));
    } catch (error) {
      setState((state) => ({ ...state, data: undefined, error }));
    }
    setState((state) => ({ ...state, loading: false }));
  }, deps);

  return [dispatch, state] as const;
}
