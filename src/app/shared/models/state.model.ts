export interface GenericState<T> {
  isLoading: boolean;
  data: T | null;
  error: string | null;
}
