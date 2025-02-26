import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
 
  name: string | null;
  refid: string | null;  
  loggedIn: boolean;
  id: string | null;
  mobileOrEmail:string | null;
}

const initialState: UserState = {  
  name: null,
  mobileOrEmail:null,
  refid:null,
  id:null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => { // Use UserState, not Omit
      const { name, refid, loggedIn,id, mobileOrEmail} = action.payload;

      state.name = name;
      state.refid = refid;
state.id=id;
      state.loggedIn = loggedIn;
      state.mobileOrEmail=mobileOrEmail
    },
    clearUser: (state) => {
      state.name = null;
      state.refid = null;
      state.loggedIn = false;
      state.  mobileOrEmail=null
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
