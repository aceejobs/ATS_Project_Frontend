import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ISearch {
  // createdAt: string
  value: string | undefined;
}

const initialState: { search: ISearch | null } = {
  search: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<ISearch>) {
      state.search = action.payload;
    },
  },
});

export const { setValue } = searchSlice.actions;
export default searchSlice.reducer;
