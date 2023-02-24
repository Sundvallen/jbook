import {
  configureStore,
  combineReducers,
  ThunkDispatch,
  Action,
} from "@reduxjs/toolkit";
import cellsReducer from "../features/cells/cellsSlice";
import bundlesReducer from "../features/bundles/bundlesSlice";
import { bundlerMiddleware } from "./middlewares/bundler-middleware";

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(bundlerMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
