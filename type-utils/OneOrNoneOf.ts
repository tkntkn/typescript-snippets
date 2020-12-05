import { NoneOf } from "./NoneOf"
import { OneOf } from "./OneOf"

export type OneOrNoneOf<T> = OneOf<T> | NoneOf<T>;
