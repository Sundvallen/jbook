import { CellTypes } from "./initialState";

interface UpdateCellPayload {
  id: string;
  content: string;
}

interface DeleteCellPayload {
  id: string;
}

interface MoveCellPayload {
  id: string;
  direction: "up" | "down";
}

interface InsertCellPayload {
  id: string | null;
  type: CellTypes;
}

interface FetchCellsPayload {}

export type {
  UpdateCellPayload,
  DeleteCellPayload,
  MoveCellPayload,
  InsertCellPayload,
  FetchCellsPayload,
};
