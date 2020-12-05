import { Mask } from "./Mask"

type OneOf<T, K extends keyof T = keyof T> = K extends keyof T
  ? Mask<T, K>
  : never;
