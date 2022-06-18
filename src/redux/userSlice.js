import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

const initialCurrentItinerary = {
  id: uuid.v4(),
  name: '',
  points: [
    { id: uuid.v4(), latitude: '', longitude: '' },
    { id: uuid.v4(), latitude: '', longitude: '' },
  ],
};
const userSlice = createSlice({
  name: 'user',
  initialState: { currentItinerary: initialCurrentItinerary, itineraries: [] },
  reducers: {
    addUserInRedux: (state, action) => {
      return { ...action.payload, currentItinerary: initialCurrentItinerary };
    },
    addItinerary: (state, action) => {
      let alreadyPresent = state.itineraries
        .map((elm) => elm.id)
        .includes(action.payload.id);

      if (alreadyPresent) {
        return state;
      } else {
        return {
          ...state,
          itineraries: [...state.itineraries, action.payload],
        };
      }
    },
    addCurrentItinerary: (state, action) => {
      return {
        ...state,
        currentItinerary: action.payload,
      };
    },
  },
});

export const { addUserInRedux, addItinerary, addCurrentItinerary } =
  userSlice.actions;
export const userSelector = (state) => state;

export default userSlice.reducer;
