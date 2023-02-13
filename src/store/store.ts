import {
  configureStore,
  combineReducers,
  ThunkDispatch,
  Action,
} from "@reduxjs/toolkit";
import cellsReducer from "../features/cells/cellsSlice";

export const store = configureStore({
  reducer: cellsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
