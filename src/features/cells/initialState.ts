export type CellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export interface CellsData {}

export interface CellsState {
  data: any;
  loading: boolean;
  error: string | null;
  order: string[];
}

export const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};
