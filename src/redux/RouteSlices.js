import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentRoute: 'Events',
  previousRoute: '',
  standardRouteName: 'routesNames.events',
};

const RouteSlice = createSlice({
  name: 'Route',
  initialState,
  reducers: {
    changeRoute(state, action) {
      return {
        ...state,
        currentRoute: action.payload.currentRouteName,
        previousRoute: action.payload.previousRouteName,
        standardRouteName: action.payload.standardRouteName,
      };
    },
  },
});

export const {changeRoute, changeCurrentRoute} = RouteSlice.actions;

const RouteReducer = RouteSlice.reducer;

export default RouteReducer;
