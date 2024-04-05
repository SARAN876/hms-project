import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const createUserList = createAsyncThunk(
  'users/createUserList',
  async (data, { getState }) => {
    const state = getState();
    const { userslist, usersCount } = state.users;
    const newUser = { ...data, id: userslist.length + 1 };
    const updatedUsersList = [...userslist, newUser];
    // Update local storage
    localStorage.setItem('usersList', JSON.stringify(updatedUsersList));
    localStorage.setItem('usersCount', usersCount + 1);
    return {
      list: updatedUsersList,
      count: usersCount + 1
    };
  }
);
export const updateUserList = createAsyncThunk(
  'users/updateUserList',
  async (list, { getState }) => {
    console.log(list);
    const state = getState();
    let { userslist } = state.users;
    userslist = await userslist.map((res) => {
      if (res.id === list.id) {
        return { ...list };
      }
      return res;
    });
    localStorage.setItem('usersList', JSON.stringify(userslist));
    return userslist;
  }
);
export const deleteUserList = createAsyncThunk('users/deleteUserList', async (id, { getState }) => {
  const state = getState();
  let { userslist } = state.users;
  userslist = await userslist.filter((res) => res.id !== id);
  const count = userslist.length;
  localStorage.setItem('usersList', JSON.stringify(userslist));
  localStorage.setItem('usersCount', count);
  return {
    list: userslist,
    count: count
  };
});
const initialState = {
  userslist: JSON.parse(localStorage.getItem('usersList')) || [
    {
      id: 1,
      name: 'ABC',
      email: 'abcd@gmail.com',
      phone_number: '884677444387',
      status: 'active',
      role: 'Employee',
      dept: 'Front Office'
    },
    {
      id: 2,
      name: 'PQR',
      email: 'pqr@gmail.com',
      phone_number: '09987777878',
      status: 'Inactive',
      role: 'Manager',
      dept: 'Housekeeping'
    },
    {
      id: 3,
      name: 'MNP',
      email: 'mnp@gmail.com',
      phone_number: '987780008767',
      status: 'Inactive',
      role: 'Owner',
      dept: 'Production'
    }
  ],
  usersCount: 3
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [createUserList.fulfilled]: (state, action) => ({
      ...state,
      userslist: action.payload.list,
      usersCount: action.payload.count
    }),
    [updateUserList.fulfilled]: (state, action) => ({
      ...state,
      userslist: action.payload
    }),
    [deleteUserList.fulfilled]: (state, action) => ({
      ...state,
      userslist: action.payload.list,
      usersCount: action.payload.count
    })
  }
});
export default usersSlice.reducer;
