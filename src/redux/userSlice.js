import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUserInRedux: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserInRedux } = userSlice.actions;
export const userSelector = (state) => state;

export default userSlice.reducer;
