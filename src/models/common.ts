export interface IdName {
  id: string;
  name: string;
}

export interface Label {
  label: string;
  value: string;
}

export const toLabel = (value: IdName) => {
  return {
    value: value.id,
    label: value.name,
  };
};

export const toLabelName = (value: IdName) => {
  return {
    value: value.name,
    label: value.name,
  };
};

export interface Price {
  compra: string;
  venta: string;
  fecha: string;
  variacion: string;
}

export class PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;

  constructor(
    items: T[],
    totalItems: number,
    currentPage: number,
    pageSize: number
  ) {
    this.items = items;
    this.totalCount = totalItems;
    this.pageNumber = currentPage;
    this.pageSize = pageSize;
  }
}

export const PAGE_SIZE = 7;
export const PAGE_SIZE_SEARCH = 15;
