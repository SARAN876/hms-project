/* eslint-disable prettier/prettier */
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { startLoading1, clearLoading1, startLoading3, clearLoading3 } from './loaderSlice';
// import { showMessage } from './messageSlice';
// import {
//   getRoleService,
//   createRoleService,
//   updateRoleService,
//   deleteRoleService
// } from '../services/rolesService';

// export const getRoleList = createAsyncThunk(
//   'rolelist/getRoleList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { rolelist } = state.role;
//     const { roleCount } = state.role;
//     dispatch(startLoading3());
//     try {
//       const response = await getRoleService(data);
//       if (response.status) {
//         dispatch(clearLoading3());
//         return { list: rolelist, count: roleCount };
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

// export const createRoleList = createAsyncThunk(
//   'rolelist/createRoleList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { rolelist } = state.role;
//     const { roleCount } = state.role;

//     dispatch(startLoading1());
//     try {
//       const response = await createRoleService(data);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(
//           showMessage({
//             message: 'Role Created',
//             variant: 'success'
//           })
//         );
//         return {
//           List: [{ ...response.asset }, ...rolelist],
//           count: Number(roleCount) + 1,
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
//       return { List: rolelist, count: 0, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { List: rolelist, count: 0, response: { status: false } };
//     }
//   }
// );

// export const updateRoleList = createAsyncThunk(
//   'rolelist/updateRoleList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     let { rolelist } = state.role;

//     dispatch(startLoading1());
//     try {
//       const response = await updateRoleService(data);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(showMessage({ message: 'Role Updated', variant: 'success' }));
//         rolelist = rolelist.map((res) => {
//           if (res.id === response.role.id) {
//             return { ...response.role };
//           }
//           return { ...res };
//         });
//         return { list: rolelist, response };
//       }
//       dispatch(clearLoading1());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { list: rolelist, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { list: rolelist, response: { status: false } };
//     }
//   }
// );

// export const deleteRoleList = createAsyncThunk(
//   'rolelist/deleteRoleList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { rolelist } = state.role;
//     const { roleCount } = state.role;

//     dispatch(startLoading1());
//     try {
//       const toDeleteBody = { ids: [data] };
//       const response = await deleteRoleService(toDeleteBody);
//       if (response.status) {
//         dispatch(clearLoading1());
//         dispatch(showMessage({ message: 'Role Deleted', variant: 'success' }));
//         const list = rolelist.filter((res) => res.id !== toDeleteBody.ids[0]);
//         return { list, count: Number(roleCount) - 1, response };
//       }
//       dispatch(clearLoading1());
//       if (response.error) {
//         response.error.message &&
//           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//       } else {
//         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//       }
//       return { list: rolelist, count: roleCount, response };
//     } catch (error) {
//       dispatch(clearLoading1());
//       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//       return { list: rolelist, count: roleCount, response: { status: false } };
//     }
//   }
// );
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const createRoleList = createAsyncThunk(
  'role/createRoleList',
  async (data, { getState }) => {
    const state = getState();
    const { rolelist, roleCount } = state.role;
    const newUser = { ...data, id: rolelist.length + 1 };
    const updatedRoleList = [...rolelist, newUser];
    // Update local storage
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
