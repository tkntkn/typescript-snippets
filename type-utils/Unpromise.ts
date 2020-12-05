export type Unpromise<T> = T extends PromiseLike<infer U> ? U : T;
