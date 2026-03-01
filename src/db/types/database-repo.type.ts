export type SingleReturn<T> = Promise<T | null>;
export type MultipleReturn<T> = Promise<
  | T[]
  | []
  | {
      count: number;
      pageSize: number;
      pages: number;
      documents: T[] | [];
    }
>;
