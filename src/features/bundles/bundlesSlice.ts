import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import bundler from "../../bundler";
import { CreateBundlePayload } from "./bundlesSliceTypes";

export interface Bundle {
  code: string;
  err: string;
  loading: boolean;
}
interface BundlesState {
  [key: string]: Bundle | undefined;
}

const initialState: BundlesState = {};

export const createBundle = createAsyncThunk(
  "bundles/createBundle",
  async (action: PayloadAction<CreateBundlePayload>, { dispatch }) => {
    const { cellId, input } = action.payload;
    // Bundle the input, outpit is an object with code and err
    const output = await bundler(input);
    return { cellId, output };
  }
);

const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state, action) => {
      const cellId = action.meta.arg.payload.cellId;
      state[cellId] = {
        code: "",
        err: "",
        loading: true,
      };
    });
    builder.addCase(createBundle.fulfilled, (state, action) => {
      const { cellId, output } = action.payload;
      state[cellId] = {
        code: output.code || "",
        err: output.err || "",
        loading: false,
      };
    });
    builder.addCase(createBundle.rejected, (state, action) => {});
  },
});

export default bundlesSlice.reducer;

// export const { bundleCreated, startBundling } = bundlesSlice.actions;
