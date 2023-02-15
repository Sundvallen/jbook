import { AnyAction, AsyncThunkAction, Middleware } from "@reduxjs/toolkit";
import bundler from "../../bundler";
import { updateCell } from "../../features/cells/cellsSlice";
import { UpdateCellPayload } from "../../features/cells/cellsSliceTypes";
import { RootState } from "../store";
import { createBundle } from "../../features/bundles/bundlesSlice";
import { CreateBundlePayload } from "../../features/bundles/bundlesSliceTypes";

interface UpdateCellAction {
  type: string;
  payload: UpdateCellPayload;
}
// Bundler typed with Middleware from redux toolkit
// And RootState from store.ts
// IMPORTANT: RootState needs to be typed with ReturnType<typeof rootReducer>
// The will be a cyclic dependency error if it is <typeof store.getState>
let timer: any;

const selectCellType = (state: RootState, id: string) => {
  const { data } = state.cells;
  return data[id].type;
};

export const bundlerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: UpdateCellAction) => {
    next(action);

    if (action.type !== updateCell.type) {
      return;
    }

    const cellType = selectCellType(store.getState(), action.payload.id);
    if (cellType === "text") return;

    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log("Starting bundling");
      const payload = {
        cellId: action.payload.id,
        input: action.payload.content,
      };
      store.dispatch(
        createBundle({ payload, type: "bundles/createBundle" }) as any
      );
    }, 750);
  };
