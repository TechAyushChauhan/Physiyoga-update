import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
 
  name: string | null;
  refid: string | null;  
  loggedIn: boolean;
}

const initialState: UserState = {  
  name: null,
  refid:null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => { // Use UserState, not Omit
      const { name, refid, loggedIn } = action.payload;

      state.name = name;
      state.refid = refid;
      state.loggedIn = loggedIn;
    },
    clearUser: (state) => {
      state.name = null;
      state.refid = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
