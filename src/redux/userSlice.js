import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUserInRedux: (state, action) => {
      return action.payload;
    },
    addItinerary: (state, action) => {
      return { ...state, itineraries: [...state.itineraries, action.payload] };
    },
  },
});

export const { addUserInRedux, addItinerary } = userSlice.actions;
export const userSelector = (state) => state;

export default userSlice.reducer;
