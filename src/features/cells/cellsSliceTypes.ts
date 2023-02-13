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

interface InsertCellBeforePayload {
  id: string;
  type: CellTypes;
}

export type {
  UpdateCellPayload,
  DeleteCellPayload,
  MoveCellPayload,
  InsertCellBeforePayload,
};
