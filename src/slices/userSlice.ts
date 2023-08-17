import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  // createdAt: string
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileImage: any;
}

const initialState: { user: IUser | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
