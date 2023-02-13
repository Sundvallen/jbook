import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

// create redux toolkit slice
export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: (state, action) => {},
    deleteCell: (state, action) => {},
    moveCell: (state, action) => {},
    insertCellBefore: (state, action) => {},
    insertCellAfter: (state, action) => {},
    fetchCells: (state, action) => {},
  },
});

export const {
  updateCell,
  deleteCell,
  moveCell,
  insertCellBefore,
  insertCellAfter,
  fetchCells,
} = cellsSlice.actions;

export default cellsSlice.reducer;
