// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   // startLoading1, clearLoading1,
//   startLoading3,
//   clearLoading3
// } from './loaderSlice';
// import { showMessage } from './messageSlice';
// import {
//   getUserService
//   // createUserService,
//   // updateUserService,
//   // deleteUserService
// } from '../services/userService';

// export const getUserList = createAsyncThunk(
//   'userslist/getUserList',
//   async (data, { dispatch, getState }) => {
//     const state = getState();
//     // let { userslist } = state.user;
//     let { usersCount } = state.user;
//     dispatch(startLoading3());
//     try {
//       const response = await getUserService(data);
//       if (response.status) {
//         dispatch(clearLoading3());
//         return { list: response.userslist, count: usersCount };
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

// // export const createUserList = createAsyncThunk(
// //   'userslist/createUserList',
// //   async (data, { dispatch, getState }) => {
// //     const state = getState();
// //     const { userslist } = state.users;
// //     const { usersCount } = state.users;

// //     dispatch(startLoading1());
// //     try {
// //       const response = await createUserService(data);
// //       if (response.status) {
// //         dispatch(clearLoading1());
// //         dispatch(
// //           showMessage({
// //             message: 'User Created',
// //             variant: 'success'
// //           })
// //         );
// //         return {
// //           List: [{ ...response.asset }, ...userslist],
// //           count: Number(usersCount) + 1,
// //           response
// //         };
// //       }
// //       dispatch(clearLoading1());
// //       if (response.error) {
// //         response.error.message &&
// //           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
// //       } else {
// //         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
// //       }
// //       return { List: userslist, count: 0, response };
// //     } catch (error) {
// //       dispatch(clearLoading1());
// //       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
// //       return { List: userslist, count: 0, response: { status: false } };
// //     }
// //   }
// // );

// // export const updateUserList = createAsyncThunk(
// //   'userslist/updateUserList',
// //   async (data, { dispatch, getState }) => {
// //     const state = getState();
// //     let { userslist } = state.users;

// //     dispatch(startLoading1());
// //     try {
// //       const response = await updateUserService(data);
// //       if (response.status) {
// //         dispatch(clearLoading1());
// //         dispatch(showMessage({ message: 'User Updated', variant: 'success' }));
// //         userslist = userslist.map((res) => {
// //           if (res.id === response.asset.id) {
// //             return { ...response.asset };
// //           }
// //           return { ...res };
// //         });
// //         return { list: userslist, response };
// //       }
// //       dispatch(clearLoading1());
// //       if (response.error) {
// //         response.error.message &&
// //           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
// //       } else {
// //         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
// //       }
// //       return { list: userslist, response };
// //     } catch (error) {
// //       dispatch(clearLoading1());
// //       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
// //       return { list: userslist, response: { status: false } };
// //     }
// //   }
// // );

// // export const deleteUserList = createAsyncThunk(
// //   'userslist/deleteUserList',
// //   async (data, { dispatch, getState }) => {
// //     const state = getState();
// //     const { userslist } = state.users;
// //     const { usersCount } = state.users;

// //     dispatch(startLoading1());
// //     try {
// //       const toDeleteBody = { ids: [data] };
// //       const response = await deleteUserService(toDeleteBody);
// //       if (response.status) {
// //         dispatch(clearLoading1());
// //         dispatch(showMessage({ message: 'User Deleted', variant: 'success' }));
// //         const list = userslist.filter((res) => res.id !== toDeleteBody.ids[0]);
// //         return { list, count: Number(usersCount) - 1, response };
// //       }
// //       dispatch(clearLoading1());
// //       if (response.error) {
// //         response.error.message &&
// //           dispatch(showMessage({ message: response.error.message, variant: 'error' }));
// //       } else {
// //         response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
// //       }
// //       return { list: userslist, count: usersCount, response };
// //     } catch (error) {
// //       dispatch(clearLoading1());
// //       error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
// //       return { list: userslist, count: usersCount, response: { status: false } };
// //     }
// //   }
// // );
// // export const createUserList = createAsyncThunk(
// //   'userlist/createUserList',
// //   async (data, { getState }) => {
// //     console.log(data, 'user Date');
// //     const state = getState();
// //     const { userlist, userCount } = state.userslist;
// //     return {
// //       List: [...userlist, { ...data, id: userlist.length + 1 }],
// //       count: userCount + 1
// //     };
// //   }
// // );

// // export const updateUserList = createAsyncThunk(
// //   'deliverylist/updateUserList',
// //   async (list, { getState }) => {
// //     const state = getState();
// //     let { userlist } = state.users;
// //     userlist = await userlist.map((res) => {
// //       if (res.id === list.id) {
// //         return { ...list };
// //       }
// //       return res;
// //     });
// //     return userlist;
// //   }
// // );
// // export const deleteUserList = createAsyncThunk(
// //   'userlist/deleteUserList',
// //   async (id, { getState }) => {
// //     const state = getState();
// //     let { userlist } = state.users;
// //     userlist = await userlist.filter((res) => res.id !== id);
// //     return userlist;
// //   }
// // );
// export const createUserList = createAsyncThunk(
//   'users/createUserList',
//   async (data, { getState }) => {
//     const state = getState();
//     const { userslist, usersCount } = state.users;
//     return {
//       list: [...userslist, { ...data, id: userslist.length + 1 }],
//       count: usersCount + 1
//     };
//   }
// );
// export const updateUserList = createAsyncThunk(
//   'users/updateUserList',
//   async (list, { getState }) => {
//     console.log(list);
//     const state = getState();
//     let { userslist } = state.users;
//     userslist = await userslist.map((res) => {
//       if (res.id === list.id) {
//         return { ...list };
//       }
//       return res;
//     });
//     return userslist;
//   }
// );
// export const deleteUserList = createAsyncThunk('users/deleteUserList', async (id, { getState }) => {
//   const state = getState();
//   let { userslist } = state.users;
//   userslist = await userslist.filter((res) => res.id !== id);
//   return userslist;
// });
// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     userslist: [
//       {
//         id: '123',
//         name: 'Cupcake',
//         email: 'test1@gmail.com',
//         phone_number: 89799098944,
//         role: 'Housekeeping',
//         password: '123 Main St',
//         status: 'active'
//       },
//       {
//         id: '345',
//         name: 'abcd',
//         email: 'test1@gmail.com',
//         phone_number: 77797468054,
//         role: 'Food Production',
//         password: '123 Main St',
//         status: 'inactive'
//       }
//     ],
//     usersCount: 0
//   },
//   reducers: {},
//   extraReducers: {
//     [getUserList.fulfilled]: (state, action) => ({
//       ...state,
//       userslist: action.payload.list,
//       usersCount: action.payload.count
//     }),
//     [createUserList.fulfilled]: (state, action) => ({
//       ...state,
//       userslist: action.payload.List,
//       usersCount: action.payload.count
//     }),
//     [updateUserList.fulfilled]: (state, action) => ({
//       ...state,
//       userslist: action.payload.list
//     }),
//     [deleteUserList.fulfilled]: (state, action) => ({
//       ...state,
//       userslist: action.payload
//     })
//   }
// });

// export default usersSlice.reducer;

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
