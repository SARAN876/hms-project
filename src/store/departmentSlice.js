/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createDepartmentList = createAsyncThunk(
  'departmentlist/createDepartmentList',
  async (data, { getState }) => {
    const state = getState();
    const { departmentlist, departmentCount } = state.department;
    const newUser = { ...data, id: departmentlist.length + 1 };
    const updatedDeptList = [...departmentlist, newUser];
    // Update local storage
    localStorage.setItem('deptList', JSON.stringify(updatedDeptList));
    localStorage.setItem('deptCount', departmentCount + 1);
    return {
      list: updatedDeptList,
      count: departmentCount + 1
    };
    // return {
    //   list: [...departmentlist, { ...data, id: departmentlist.length + 1 }],
    //   count: departmentCount + 1
    // };
  }
);

export const updateDepartmentList = createAsyncThunk(
  'departmentlist/updateDepartmentList',
  async (list, { getState }) => {
    const state = getState();
    let { departmentlist } = state.department;
    departmentlist = await departmentlist.map((res) => {
      if (res.id === list.id) {
        return { ...list };
      }
      return res;
    });
    localStorage.setItem('deptList', JSON.stringify(departmentlist));

    return departmentlist;
  }
);
export const deleteDepartmentList = createAsyncThunk(
  'departmentlist/deleteDepartmentList',
  async (id, { getState }) => {
    const state = getState();
    let { departmentlist } = state.department;
    departmentlist = await departmentlist.filter((res) => res.id !== id);
    const count = departmentlist.length;
    localStorage.setItem('deptList', JSON.stringify(departmentlist));
    localStorage.setItem('deptCount', count);
    return {
      list: departmentlist,
      count: count
    };
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departmentlist: JSON.parse(localStorage.getItem('deptList')) || [
      {
        id: '1',
        name: 'Housekeeping',
        status: '1'
      },
      {
        id: '2',
        name: 'Production',
        status: '1'
      }
    ],
    departmentCount: 2
  },
  reducers: {},
  extraReducers: {
    // [getDepartmentList.fulfilled]: (state, action) => ({
    //   ...state,
    //   departmentlist: action.payload.list,
    //   departmentCount: action.payload.count
    // }),
    [createDepartmentList.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload.list,
      departmentCount: action.payload.count
    }),
    [updateDepartmentList.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload
    }),
    [deleteDepartmentList.fulfilled]: (state, action) => ({
      ...state,
      departmentlist: action.payload.list,
      departmentCount: action.payload.count
    })
  }
});

export default departmentSlice.reducer;
