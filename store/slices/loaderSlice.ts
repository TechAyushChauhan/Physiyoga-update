import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loaderState {
  loading: boolean;
}

const initialState: loaderState = {
    loading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setloader: (state, action: PayloadAction<boolean>) => {
      state.loading= action.payload
    },
  },
});

export const { setloader} = loaderSlice.actions;
export default loaderSlice.reducer;
