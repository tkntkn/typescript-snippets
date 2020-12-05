export type Mask<T, K extends keyof T = keyof T> = Pick<T, K> &
  { [key in Exclude<keyof T, K>]?: undefined };
