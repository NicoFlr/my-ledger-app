import {combineReducers} from '@reduxjs/toolkit';
import RouteReducer from './RouteSlices';
import UserReducer from './UserSlices';

const rootReducer = combineReducers({
  route: RouteReducer,
  user: UserReducer,
});

export default rootReducer;
