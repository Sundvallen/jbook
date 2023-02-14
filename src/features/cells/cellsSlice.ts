import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cell, CellsData, CellsState, initialState } from "./initialState";
import {
  UpdateCellPayload,
  DeleteCellPayload,
  MoveCellPayload,
  InsertCellPayload,
  FetchCellsPayload,
} from "./cellsSliceTypes";

export const fetchCells = createAsyncThunk(
  "cells/fetchCells",
  async (action: PayloadAction<FetchCellsPayload>, { dispatch }) => {}
);

// create redux toolkit slice
export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<DeleteCellPayload>) => {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter((cellId) => cellId !== id);
    },
    moveCell: (state, action: PayloadAction<MoveCellPayload>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    insertCell: (state, action: PayloadAction<InsertCellPayload>) => {
      const { id, type } = action.payload;
      const cell: Cell = {
        id: randomId(),
        type,
        content: "",
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex((cellId) => cellId === id);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state, action) => {});
    builder.addCase(fetchCells.fulfilled, (state, action) => {});
    builder.addCase(fetchCells.rejected, (state, action) => {});
  },
});

export const { updateCell, deleteCell, moveCell, insertCell } =
  cellsSlice.actions;

const randomId = () => {
  return Math.random().toString(36);
};

export default cellsSlice.reducer;
