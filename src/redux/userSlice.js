import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { updateUser } from '../services/firebase';

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

      let countRecent = state.itineraries
        .filter(ele => ele.type === 'recent').length

      if(countRecent >= 10) {
        const array = [...state.itineraries]
        //.sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(1, state.itineraries.length)
        console.log(array)
        //Firebase update
        if (state.uid) {
          updateUser({
            ...state,
            itineraries: [...array, action.payload],
          });
        }
        //Redux update
        return {
          ...state,
          itineraries: [...array, action.payload],
        };
      } 

      if (alreadyPresent) {
        return state;
      } else {
        if (state.uid) {
          updateUser({
            ...state,
            itineraries: [...state.itineraries, action.payload],
          });
        }
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
    removeItinerary: (state, action) => {
      if (state.uid) {
        updateUser({
          ...state,
          itineraries: action.payload,
        });
      }
      return {
        ...state,
        itineraries: action.payload,
      };
    },
    cleanUserOnLogout: (state, action) => {
      return {
        currentItinerary: initialCurrentItinerary,
        itineraries: [],
      };
    },
  },
});

export const {
  addUserInRedux,
  addItinerary,
  addCurrentItinerary,
  removeItinerary,
  cleanUserOnLogout,
} = userSlice.actions;
export const userSelector = (state) => state;

export default userSlice.reducer;
