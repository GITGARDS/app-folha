import { Pageable, PageableInit, Sort, SortInit } from "./page";

export interface Prodes {
  id: number;
  codigo: number;
  descricao: string;
  tipo: string;
  automatico: boolean;
  tipoValor: string;
  valor: number;
  incidencia: number;
  ativo: boolean;
}

export interface ProdesPageable {
  content: Prodes[];
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

export const ProdesInit: Prodes = {
  id: 0,
  codigo: 0,
  descricao: '',
  tipo: '',
  automatico: false,
  tipoValor: '',
  valor: 0,
  incidencia: 0,
  ativo: true,
};

export const ProdesPageableInit: ProdesPageable = {
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
