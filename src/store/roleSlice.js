/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const createRoleList = createAsyncThunk(
  'role/createRoleList',
  async (data, { getState }) => {
    const state = getState();
    const { rolelist, roleCount } = state.role;
    const newUser = { ...data, id: rolelist.length + 1 };
    const updatedRoleList = [...rolelist, newUser];
    localStorage.setItem('roleList', JSON.stringify(updatedRoleList));
    localStorage.setItem('roleCount', roleCount + 1);
    return {
      list: updatedRoleList,
      count: roleCount + 1
    };
    // return {
    //   list: [...rolelist, { ...data, id: rolelist.length + 1 }],
    //   count: roleCount + 1
    // };
  }
);
export const updateRoleList = createAsyncThunk(
  'role/updateRoleList',
  async (list, { getState }) => {
    const state = getState();
    let { rolelist } = state.role;
    console.log(list);
    rolelist = await rolelist.map((res) => {
      if (res.id === list.id) {
        return { ...list };
      }
      return res;
    });
    localStorage.setItem('roleList', JSON.stringify(rolelist));
    return rolelist;
  }
);
export const deleteRoleList = createAsyncThunk('role/deleteRoleList', async (id, { getState }) => {
  const state = getState();
  let { rolelist } = state.role;
  rolelist = await rolelist.filter((res) => res.id !== id);
  const count = rolelist.length;
  localStorage.setItem('roleList', JSON.stringify(rolelist));
  localStorage.setItem('roleCount', count);
  return {
    list: rolelist,
    count: count
  };
});
const roleSlice = createSlice({
  name: 'role',
  initialState: {
    rolelist: JSON.parse(localStorage.getItem('roleList')) || [
      {
        id: '1',
        role: 'manager',
        status: '1'
      },
      {
        id: '2',
        role: 'employee',
        status: '0'
      }
    ],
    roleCount: 2
  },
  reducers: {},
  extraReducers: {
    // [getRoleList.fulfilled]: (state, action) => ({
    //   ...state,
    //   rolelist: action.payload.list,
    //   roleCount: action.payload.count
    // }),
    [createRoleList.fulfilled]: (state, action) => ({
      ...state,
      rolelist: action.payload.list,
      roleCount: action.payload.count
    }),
    [updateRoleList.fulfilled]: (state, action) => ({
      ...state,
      rolelist: action.payload
    }),
    [deleteRoleList.fulfilled]: (state, action) => ({
      ...state,
      rolelist: action.payload.list,
      roleCount: action.payload.count
    })
  }
});

export default roleSlice.reducer;
