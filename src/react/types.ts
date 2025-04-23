export type QueryReturn<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};
