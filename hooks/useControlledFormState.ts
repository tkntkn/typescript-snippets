import { useState, useCallback, ChangeEvent } from "react";

type TargetElement = HTMLInputElement | HTMLSelectElement;

export function useControlledFormState<Element extends TargetElement>(
  init?: string
) {
  const [value, setValue] = useState(init);
  const onChange = useCallback((event: ChangeEvent<Element>) => {
    setValue(event.target.value);
  }, []);
  return { value, onChange } as const;
}
