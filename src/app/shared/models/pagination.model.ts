export interface BasePagination {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> extends BasePagination {
  items: T[];
  totalPages: number;
  totalCount: number;
}
