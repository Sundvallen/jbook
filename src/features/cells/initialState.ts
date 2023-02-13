export type CellTypes = "code" | "text";

interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

interface CellsState {
  data: { [key: string]: Cell } | {};
  loading: boolean;
  error: string | null;
  order: string[];
}

const data = {
  "1": {
    id: "1",
    type: "text",
    content: "Hello World",
  },
  "2": {
    id: "2",
    type: "code",
    content: "console.log('Hello World')",
  },
};
export const initialState = {
  data,
  loading: false,
  error: null,
  order: [],
} as CellsState;
