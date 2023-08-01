/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const getDepartmentList = createAsyncThunk(
//   'departmentlist/getDepartmentList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     let { departmentlist } = state.departments;
//     let { departmentCount } = state.department;
//     dispatch(startLoading3());
//     try {
//       const response = await getDepartmentService(data);
//       if (response.status) {
//         dispatch(clearLoading3());
//         return { list: departmentlist, count: departmentCount };
//       }
//       dispatch(clearLoading3());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { list: [], count: 0 };
//     } catch (error) {
//       dispatch(clearLoading3());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { list: [], count: 0 };
//     }
//   }
// );

// export const createDepartmentList = createAsyncThunk(
//   'departmentlist/createDepartmentList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { departmentlist } = state.department;
//     const { departmentCount } = state.department;

//     dispatch(startLoading1());
//     try {
//       const response = await createDepartmentService(data);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(
//           showMessage({
//             message: 'Department Created',
//             variant: 'success'
//           })
//         );
//         return {
//           List: [{ ...response.asset }, ...departmentlist],
//           count: Number(departmentCount) + 1,
//           response
//         };
//       }
//       dispatch(clearLoading1());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { List: departmentlist, count: 0, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { List: departmentlist, count: 0, response: { status: false } };
//     }
//   }
// );

// export const updateDepartmentList = createAsyncThunk(
//   'departmentlist/updateDepartmentList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     let { departmentlist } = state.department;

//     dispatch(startLoading1());
//     try {
//       const response = await updateDepartmentService(data);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(showMessage({ message: 'Department Updated', variant: 'success' }));
//         departmentlist = departmentlist.map((res) => {
//           if (res.id === response.department.id) {
//             return { ...response.department };
//           }
//           return { ...res };
//         });
//         return { list: departmentlist, response };
//       }
//       dispatch(clearLoading1());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { list: departmentlist, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { list: departmentlist, response: { status: false } };
//     }
//   }
// );

// export const deleteDepartmentList = createAsyncThunk(
//   'departmentlist/deleteDepartmentList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { departmentlist } = state.department;
//     const { departmentCount } = state.department;

//     dispatch(startLoading1());
//     try {
//       const toDeleteBody = { ids: [data] };
//       const response = await deleteDepartmentService(toDeleteBody);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(showMessage({ message: 'Department Deleted', variant: 'success' }));
//         const list = departmentlist.filter((res) => res.id !== toDeleteBody.ids[0]);
//         return { list, count: Number(departmentCount) - 1, response };
//       }
//       dispatch(clearLoading1());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { list: departmentlist, count: departmentCount, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { list: departmentlist, count: departmentCount, response: { status: false } };
//     }
//   }
// );
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
