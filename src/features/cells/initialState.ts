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

const data = {
  1: {
    id: "1",
    type: "text",
    content: "Hello World",
  },
  2: {
    id: "2",
    type: "code",
    content: "console.log('Hello World')",
  },
};

export const initialState: CellsState = {
  data,
  loading: false,
  error: null,
  order: ["1", "2"],
};
