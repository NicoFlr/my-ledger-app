import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  roleId: '',
  transactions: [],
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    logInUser(state, action) {
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        roleId: action.payload.roleId,
        transactions: action.payload.transactions
      };
    },
    editUserName(state, action) {
      return {
        ...state,
        firstName: action.payload,
      };
    },
    logoutUser(state) {
      return initialState;
    },
  },
});

export const {
  logInUser,
  logoutUser,
  editUserName,
} = UserSlice.actions;

const UserReducer = UserSlice.reducer;

export default UserReducer;
