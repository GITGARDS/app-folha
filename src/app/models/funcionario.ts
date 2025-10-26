export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  salarioBase: number;
}

export interface FuncionarioPageable {
  content: Funcionario[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

const FuncionarioInit = {
  id: 0,
  nome: '',
  cargo: '',
  salarioBase: 0,
};

const SortInit = {
  empty: false,
  sorted: false,
  unsorted: false,
};

const PageableInit: Pageable = {
  pageNumber: 0,
  pageSize: 0,
  sort: SortInit,
  offset: 0,
  paged: false,
  unpaged: false,
};

export const FuncionarioPageableInit: FuncionarioPageable = {
  content: [],
  pageable: PageableInit,
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  sort: SortInit,
  first: false,
  numberOfElements: 0,
  empty: false,
};
