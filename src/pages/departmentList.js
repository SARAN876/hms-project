// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import { pink } from '@mui/material/colors';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { useSelector, useDispatch } from 'react-redux';
// import Formsy from 'formsy-react';
// import { TextFieldFormsy } from '../components/formsy';
// import {
//   Container,
//   Button,
//   Grid,
//   Dialog,
//   Toolbar,
//   Typography,
//   Tooltip,
//   CircularProgress,
//   Avatar,
//   // Button,
//   Stack,
//   TextField,
//   // Icon,
//   MenuItem
// } from '@mui/material';
// import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
// import Paper from '@mui/material/Paper';
// import { visuallyHidden } from '@mui/utils';
// import {
//   createDepartmentList,
//   deleteDepartmentList,
//   getDepartmentList,
//   updateDepartmentList
// } from '../store/departmentSlice';
// import { useForm } from '../components/index';

// const headCells = [
//   {
//     id: 'id',
//     numeric: false,
//     disablePadding: false,
//     label: 'Dept ID',
//     sort: true
//   },
//   {
//     id: 'role',
//     disablePadding: false,
//     align: 'left',
//     label: 'Dept Role',
//     sort: true
//   },
//   {
//     id: 'date',
//     disablePadding: false,
//     align: 'left',
//     label: 'Date'
//   },
//   {
//     id: 'statue',
//     numeric: false,
//     disablePadding: false,
//     align: 'left',
//     label: 'Status',
//     sort: true
//   },
//   {
//     id: 'actions',
//     label: 'Actions',
//     numeric: true,
//     disablePadding: false,
//     align: 'center',
//     sort: false
//   }
// ];
// const optionsRole = [
//   { label: 'All', value: 'all' },
//   { label: 'Housekeeping', value: 'Housekeeping' },
//   { label: 'Front office', value: 'Front office' },
//   { label: 'Food Production', value: 'Food Production' }
// ];
// const RolesList = [
//   { label: 'Housekeeping', value: 'Housekeeping' },
//   { label: 'Front office', value: 'Front office' },
//   { label: 'Food Production', value: 'Food Production' }
// ];

// export default function DepartmentList() {
//   const [order] = useState('asc');
//   // const [orderBy, setOrderBy] = useState('');
//   const [createStatus, setCreateStatus] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const loading1 = useSelector(({ loading }) => loading.loading1);
//   const [deletedDialog, setDeleteDialog] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [view, setView] = useState();
//   const [setdelete, setdeleteId] = useState('');
//   const [search, setSearch] = useState('');
//   const initialFields = {
//     id: '',
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//     address: '',
//     date: ''
//   };
//   const { form, setForm, handleChange, resetForm } = useForm(initialFields);

//   const dispatch = useDispatch();
//   const departmentData = useSelector(({ department }) => department.departmentlist);

//   useEffect(() => {
//     dispatch(getDepartmentList());
//   }, []);

//   const createFun = () => {
//     resetForm();
//     setCreateStatus(true);
//     setOpenDialog(true);
//   };

//   const closeFun = () => {
//     setValue(false);
//     setCreateStatus(false);
//     setOpenDialog(false);
//   };
//   const setFormData = (data1, data2) => {
//     Object.keys(data1).map(function (key1) {
//       Object.keys(data2).map(function (key2) {
//         if (key1 === key2) {
//           data1[key1] = data2[key2];
//         }
//       });
//     });
//   };

//   const editopenFun = (data) => {
//     setFormData(initialFields, data);
//     setForm({
//       ...initialFields
//     });
//     setOpenDialog(true);
//   };

//   const handleRequestSort = (data) => {
//     console.log(data);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     dispatch(
//       getDepartmentList({
//         search: search,
//         page: newPage + 1,
//         limit: rowsPerPage,
//         sortBy: order.id,
//         sortDirection: order.direction
//       })
//     );
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//     dispatch(
//       getDepartmentList({
//         search: search,
//         page: 0 + 1,
//         limit: parseInt(event.target.value, 10),
//         sortBy: order.id,
//         sortDirection: order.direction
//       })
//     );
//   };
//   const handleSearch = (data) => {
//     setSearch(data);
//     if (data === '' || data.length > 1) {
//       dispatch(
//         getDepartmentList({
//           search: data,
//           page: page + 1,
//           limit: rowsPerPage,
//           sortBy: order.id,
//           sortDirection: order.direction
//         })
//       );
//     }
//   };

//   const deleteDialogOpen = (data) => {
//     setdeleteId(data);
//     setDeleteDialog(true);
//   };
//   const deleteDialogClose = () => {
//     setDeleteDialog(false);
//   };
//   const handleViewOpen = (data) => {
//     setView(data);
//     setOpenView(true);
//   };
//   const handleViewClose = () => {
//     setOpenView(false);
//   };
//   const handleDeleteRow = (data) => {
//     dispatch(deleteDepartmentList({ data })).then((res) => {
//       if (res && res?.payload) {
//         window.location.reload();
//       }
//     });
//   };
//   const handleSubmit = () => {
//     if (createStatus) {
//       let data = { ...form };
//       delete data.id;
//       dispatch(createDepartmentList(data)).then((res) => {
//         if (res && res.payload) {
//           setCreateStatus(false);
//           setOpenDialog(false);
//         }
//       });
//     } else {
//       dispatch(updateDepartmentList(form)).then((res) => {
//         if (res && res.payload) {
//           setCreateStatus(false);
//           setOpenDialog(false);
//         }
//       });
//     }
//   };
//   const [, setValue] = React.useState('');
//   const [role, setRole] = React.useState('');

//   const handleChangeRole = (event) => {
//     setRole(event.target.value);
//   };

//   const handleChangeActive = (event) => {
//     setValue(event.target.value);
//   };
//   return (
//     <>
//       <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem' }}>
//         <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
//           <Grid item>
//             <Box sx={{ display: 'flex', justifyContent: 'space-start' }}>
//               <PeopleAltSharpIcon color="#004e49" width="25" height="28" paddingtop={1} />
//               <Typography variant="h6" component="h6" paddingLeft={1}>
//                 Department List
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box
//               style={{
//                 display: 'flex',
//                 justifyContent: 'flex-end',
//                 flexDirection: 'row',
//                 columnGap: '5px'
//               }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-end' }}>
//                 <Avatar
//                   sx={{
//                     backgroundColor: 'primary.dark',
//                     color: 'white'
//                   }}
//                   onClick={() => createFun()}>
//                   <Tooltip title="ADD" arrow>
//                     <AddIcon />
//                   </Tooltip>
//                 </Avatar>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//         <br />
//         <Box sx={{ width: '100%' }}>
//           <Paper sx={{ width: '100%', mb: 2 }}>
//             <TableContainer>
//               <Grid
//                 container
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="baseline"
//                 padding={1}>
//                 <Grid item xs={12} sm={3} md={3}>
//                   <Stack
//                     spacing={2}
//                     alignItems="center"
//                     direction={{
//                       xs: 'column',
//                       sm: 'row'
//                     }}
//                     sx={{ px: 0, py: 1 }}>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       select
//                       label="Filter"
//                       // value={list}
//                       // onChange={handelFilter}
//                       SelectProps={{
//                         MenuProps: {
//                           PaperProps: {
//                             sx: {
//                               maxHeight: 240
//                             }
//                           }
//                         }
//                       }}
//                       sx={{
//                         maxWidth: { sm: 220 },
//                         textTransform: 'capitalize'
//                       }}>
//                       {optionsRole.map((option) => (
//                         <MenuItem
//                           key={option.value}
//                           value={option.value}
//                           sx={{
//                             mx: 1,
//                             my: 0.5,
//                             borderRadius: 0.75,
//                             typography: 'body2',
//                             textTransform: 'capitalize',
//                             '&:first-of-type': { mt: 0 },
//                             '&:last-of-type': { mb: 0 },
//                             '&:hover': {
//                               background: 'rgba(0, 171, 85, 0.8)'
//                             }
//                           }}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Stack>
//                 </Grid>
//                 <Grid item sm={4} xs={12} md={3} lg={2.5}>
//                   <Stack spacing={0} direction={{ xs: 'column', sm: 'row' }}>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       value={search}
//                       onChange={(event) => handleSearch(event.target.value)}
//                       placeholder="Search"
//                     />
//                   </Stack>
//                 </Grid>
//               </Grid>
//               <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
//                 <TableHead>
//                   <TableRow>
//                     {headCells.map((row) => (
//                       <TableCell
//                         key={row.id}
//                         align={row.align}
//                         padding={row.disablePadding ? 'none' : 'normal'}
//                         sortDirection={order.id === row.id ? order.direction : false}>
//                         {row.sort ? (
//                           <Tooltip
//                             title="Sort"
//                             placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
//                             enterDelay={300}>
//                             <TableSortLabel
//                               sx={{ whiteSpace: 'nowrap' }}
//                               active={order.id === row.id}
//                               direction={order.direction}
//                               onClick={handleRequestSort(row.id)}>
//                               {row.label}
//                               {order.id === row.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                               ) : null}
//                             </TableSortLabel>
//                           </Tooltip>
//                         ) : (
//                           <>{row.label}</>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {departmentData.map((row) => {
//                     return (
//                       <TableRow hover key={row?.name} sx={{ cursor: 'pointer' }}>
//                         <TableCell component="th">{row?.id}</TableCell>
//                         <TableCell>{row.role}</TableCell>
//                         <TableCell>{row.date}</TableCell>
//                         <TableCell>{row.status}</TableCell>

//                         <TableCell align="right">
//                           <Box
//                             style={{
//                               display: 'flex',
//                               justifyContent: 'flex-end',
//                               flexDirection: 'row',
//                               columnGap: '5px'
//                             }}>
//                             <Avatar
//                               sx={{ bgcolor: 'warning.light', width: 33, height: 33 }}
//                               onClick={() => handleViewOpen(row)}>
//                               <Tooltip title="View" arrow>
//                                 <VisibilityIcon />
//                               </Tooltip>
//                             </Avatar>
//                             <Avatar
//                               sx={{ bgcolor: 'primary.main', width: 33, height: 33 }}
//                               onClick={() => editopenFun(row)}>
//                               <Tooltip title="Edit" arrow>
//                                 <EditIcon />
//                               </Tooltip>
//                             </Avatar>
//                             <Avatar
//                               sx={{ bgcolor: pink[500], width: 33, height: 33 }}
//                               onClick={() => deleteDialogOpen(row.id)}>
//                               <Tooltip title="Delete" arrow>
//                                 <DeleteIcon />
//                               </Tooltip>
//                             </Avatar>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={departmentData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Paper>
//         </Box>
//       </Container>

//       {/* { ---- dialog add----} */}

//       <Dialog
//         open={openDialog}
//         fullWidth
//         maxWidth="xs"
//         disableEscapeKeyDown={true}
//         aria-labelledby="form-dialog-title"
//         classes={{
//           paper: 'rounded-8'
//         }}>
//         <Toolbar>
//           <Typography variant="h5" color="Green">
//             {createStatus ? 'Add' : 'Update'} Department
//           </Typography>
//         </Toolbar>
//         <Formsy onValidSubmit={handleSubmit} name="registerForm">
//           <Box
//             sx={{
//               '& .MuiTextField-root': { mb: 1, mt: 0 },
//               '& .react-tel-input.focused': { borderColor: 'green' },
//               m: 2
//             }}>
//             <TextFieldFormsy
//               label="Dept ID"
//               id="id"
//               name="id"
//               variant="outlined"
//               value={form.id}
//               onChange={handleChange}
//               required
//               fullWidth
//               type="number"
//               InputLabelProps={{
//                 shrink: true
//               }}
//               size="small"
//             />
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Dept List *</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={role}
//                 required
//                 size="small"
//                 label="Dept List *"
//                 onChange={handleChangeRole}>
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {RolesList.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     sx={{
//                       mx: 1,
//                       my: 0.5,
//                       borderRadius: 0.75,
//                       '&:first-of-type': { mt: 0 },
//                       '&:last-of-type': { mb: 0 },
//                       '&:hover': {
//                         background: 'rgba(0, 171, 85, 0.8)'
//                       }
//                     }}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl>
//               <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
//               <RadioGroup
//                 aria-labelledby="demo-controlled-radio-buttons-group"
//                 name="controlled-radio-buttons-group"
//                 value={form.status}
//                 onChange={handleChangeActive}>
//                 <FormControlLabel value="active" control={<Radio />} label="Active" />
//                 <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
//               </RadioGroup>
//             </FormControl>
//             <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
//               <Grid item>
//                 <Button
//                   sx={{ mt: 1, mb: 1, px: 4 }}
//                   type="submit"
//                   variant="contained"
//                   color="success"
//                   aria-label="Register"
//                   style={{ textTransform: 'capitalize', fontSize: '16px' }}>
//                   {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Create'}
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   sx={{ mt: 1, mb: 1, px: 4 }}
//                   variant="contained"
//                   onClick={() => closeFun()}
//                   color="warning"
//                   style={{ textTransform: 'capitalize', fontSize: '16px' }}>
//                   Close
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Formsy>
//       </Dialog>
//       <Dialog
//         open={deletedDialog}
//         fullWidth
//         maxWidth="xs"
//         disableEscapeKeyDown
//         aria-labelledby="form-dialog-title"
//         classes={{
//           paper: 'rounded-8'
//         }}>
//         <Toolbar>
//           <Typography variant="h5" color="error">
//             Alert
//           </Typography>
//         </Toolbar>
//         <Typography margin="0px 15px 15px 21px">Are you sure want to delete?</Typography>
//         <Box
//           sx={{
//             '& .MuiTextField-root': { mb: 1, mt: 1 },
//             '& .react-tel-input.focused': { borderColor: 'transparent1' },
//             m: 2
//           }}>
//           <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
//             <Grid item>
//               <Button
//                 sx={{ mt: 1, mb: 1, px: 4 }}
//                 type="button"
//                 disabled={loading1}
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleDeleteRow(setdelete)}
//                 aria-label="delete"
//                 style={{ textTransform: 'capitalize', fontSize: '16px' }}>
//                 {loading1 ? <CircularProgress size={24} olor="inherit" /> : 'Yes'}
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 sx={{ mt: 1, mb: 1, px: 4 }}
//                 // fullWidth
//                 variant="contained"
//                 onClick={() => deleteDialogClose()}
//                 color="warning"
//                 style={{ textTransform: 'capitalize', fontSize: '16px' }}>
//                 No
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Dialog>
//       <Dialog
//         open={openView}
//         fullWidth
//         maxWidth="sm"
//         disableEscapeKeyDown
//         aria-labelledby="form-dialog-title"
//         classes={{
//           paper: 'rounded-8'
//         }}>
//         <Toolbar>
//           <Typography variant="h5" color="primary">
//             Department Details
//           </Typography>
//         </Toolbar>
//         <TableContainer sx={{ px: 2 }}>
//           <Paper>
//             <Table aria-label="simple table" size="small">
//               <TableBody>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="subtitle2" color="grey">
//                       Dept ID
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2">{view?.id}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="subtitle2" color="grey">
//                       Dept Role
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2">{view?.role}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="subtitle2" color="grey">
//                       Status
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2">{view?.status}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="subtitle2" color="grey">
//                       Date
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2">{view?.date}</Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Paper>
//         </TableContainer>
//         <Grid container justifyContent="space-between" alignItems="baseline" direction="row">
//           <Grid item />
//           <Grid item>
//             <Button
//               sx={{ mt: 2, mb: 2, px: 4, mr: 2 }}
//               // fullWidth
//               variant="contained"
//               onClick={handleViewClose}
//               color="warning">
//               Close
//             </Button>
//           </Grid>
//         </Grid>
//       </Dialog>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import Iconify from '@iconify/react';
import { Stack, TextField, Grid, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import {
  createDepartmentList,
  updateDepartmentList,
  deleteDepartmentList
} from '../store/departmentSlice';
import 'react-phone-input-2/lib/material.css';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RHFTextField, RHFRadioGroup } from '../components/hooks/index';
import FormProvider from '../components/FormProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    minHeight: '80vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0)
  }
}));
const status = [
  { label: 'All', value: 'all' },
  { label: 'Front Office', value: 'frontoffice' },
  { label: 'Housekeeping', value: 'Housekeeping' },
  { label: 'Production', value: 'Production' }
];
const activeData = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' }
];
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing()
}));

const DepartmentPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departmentData = useSelector(({ department }) => department.departmentlist);
  const userscount = useSelector(({ users }) => users.usersCount);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [openView, setopenView] = useState(false);
  const [details] = useState();
  const [removeData, setRemoveData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filteredUserList, setFilteredUserList] = useState(departmentData);
  const [filterRole, setFilterRole] = useState('');

  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'createdAt'
  });

  const defaultValues = {
    id: '',
    name: '',
    status: ''
  };
  const DeptSchema = Yup.object().shape({
    name: Yup.string()
      .required('Dept name is required')
      .min(3, 'Dept name must be at list 3 char')
      .max(30, 'Make Should not exceed 30'),
    status: Yup.string().required('Status is required')
  });
  const methods = useForm({
    resolver: yupResolver(DeptSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const deleteUser = (data) => {
    setRemoveData(data);
    setOpen(true);
  };

  const deleteDialogClose = () => {
    setOpen(false);
  };
  const userdelete = () => {
    dispatch(deleteDepartmentList(removeData)).then((res) => {
      if (res && res.payload) {
        setOpen(false);
      }
    });
  };

  const handleViewOpen = (data) => {
    navigate(`/department/${data.id}`, { state: { deptDetailes: data } });
    // setDetails(data);
    // setopenView(true);
  };
  const handleViewClose = () => {
    setopenView(false);
  };
  const rows = [
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: 'Dept ID',
      sort: true
    },
    {
      id: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Dept Name',
      sort: true
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: 'Status',
      sort: true
    },
    {
      id: 'actions',
      align: 'right',
      disablePadding: false,
      label: 'Actions',
      sort: false
    }
  ];

  useEffect(() => {
    setFilteredUserList(departmentData);
  }, [departmentData]);

  const createRole = () => {
    // resetForm();
    setCreateStatus(true);
    setOpenDialog(true);
  };

  const closeRole = () => {
    setCreateStatus(false);
    setOpenDialog(false);
    reset();
  };

  const updateFun = (data) => {
    Object.keys(defaultValues).map((res) => setValue(res, data[res] || ''));
    setValue('status', String(data.status));
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => () => {
    const isAsc = order.id === property && order.direction === 'asc';
    const sortedList = [...filteredUserList].sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setFilteredUserList(sortedList);
    setOrder({ id: property, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleSearch = (data) => {
    setSearch(data);

    const filteredList = departmentData.filter(
      (user) =>
        user.name.toLowerCase().includes(data.toLowerCase()) ||
        user.id.toLowerCase().includes(data.toLowerCase())
    );

    setFilteredUserList(filteredList);
  };
  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
    const filteredData =
      event.target.value === 'all'
        ? departmentData
        : departmentData.filter((item) => item.name === event.target.value);
    setFilteredUserList(filteredData);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (createStatus) {
      delete data.id;
      dispatch(createDepartmentList(data)).then((res) => {
        if (res && res.payload) {
          setCreateStatus(false);
          setOpenDialog(false);
          reset();
        }
      });
    } else {
      dispatch(updateDepartmentList(data)).then((res) => {
        if (res && res.payload) {
          setCreateStatus(false);
          setOpenDialog(false);
          reset();
        }
      });
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-start'
            }}>
            <SortSharpIcon color="#004e49" width="25" height="28" />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Department
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => createRole()}
              disableRipple
              sx={{ bgcolor: theme.palette.primary.main, color: '#fff' }}>
              <AddSharpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 1.5, px: 2 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            padding={1}>
            <Grid item xs={12} sm={3} md={3}>
              <Stack
                spacing={2}
                alignItems="center"
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                sx={{ px: 0, py: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Filter"
                  value={filterRole}
                  onChange={handleFilterRole}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          maxHeight: 240
                        }
                      }
                    }
                  }}
                  sx={{
                    maxWidth: { sm: 220 },
                    textTransform: 'capitalize'
                  }}>
                  {status.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                        '&:first-of-type': { mt: 0 },
                        '&:last-of-type': { mb: 0 },
                        '&:hover': {
                          background: 'rgba(0, 171, 85, 0.8)'
                        }
                      }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Grid>
            <Grid item sm={4} xs={12} md={3} lg={2.5}>
              <Stack spacing={0} direction={{ xs: 'column', sm: 'row' }}>
                <TextField
                  fullWidth
                  size="small"
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search"
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows.map((row) => (
                  <TableCell
                    key={row.id}
                    align={row.align}
                    padding={row.disablePadding ? 'none' : 'normal'}
                    sortDirection={order.id === row.id ? order.direction : false}>
                    {row.sort ? (
                      <Tooltip
                        title="Sort"
                        placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}>
                        <TableSortLabel
                          active={order.id === row.id}
                          direction={order.direction}
                          onClick={handleRequestSort(row.id)}>
                          {row.label}
                          {order.id === row.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </Tooltip>
                    ) : (
                      <>{row.label}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserList.map((res, i) => (
                <TableRow
                  key={i}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}>
                  <TableCell>{res.id} </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="title">{res.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={res.status === '1' ? 'active' : 'Inactive'}
                      size="small"
                      color={res.status === '1' ? 'primary' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        columnGap: '5px'
                      }}>
                      <Avatar
                        sx={{ bgcolor: 'warning.light', width: 33, height: 33 }}
                        onClick={() => handleViewOpen(res)}>
                        <Tooltip title="View" arrow>
                          <RemoveRedEyeIcon />
                        </Tooltip>
                      </Avatar>
                      <Avatar
                        sx={{ bgcolor: 'primary.main', width: 33, height: 33 }}
                        onClick={() => updateFun(res)}>
                        <Tooltip title="Edit" arrow>
                          <EditIcon />
                        </Tooltip>
                      </Avatar>
                      <Avatar
                        sx={{ bgcolor: 'rgb(233, 30, 99)', width: 33, height: 33 }}
                        onClick={() => deleteUser(res.id)}>
                        <Tooltip title="Delete" arrow>
                          <DeleteIcon />
                        </Tooltip>
                      </Avatar>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={userscount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            {createStatus ? 'Create' : 'Update'} Department
          </Typography>
        </Toolbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 1 },
              '& .react-tel-input.focused': {
                borderColor: theme.palette.primary.main
              },
              m: 2
            }}>
            <RHFTextField
              id="nane"
              name="name"
              size="small"
              type="text"
              label="Dept Name"
              InputLabelProps={{
                shrink: true
              }}
            />
            <Box mt={-1}>
              <LabelStyle>Status</LabelStyle>
              <RHFRadioGroup
                name="status"
                options={activeData}
                id="status"
                sx={{
                  '& .MuiFormControlLabel-root': { mr: 3 }
                }}
              />
            </Box>
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 2, mb: 1, px: 3 }}
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  className={classes.submit}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 3 }}
                  // fullWidth
                  variant="contained"
                  onClick={() => closeRole()}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Dialog>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="error">
            Alert
          </Typography>
        </Toolbar>
        <Typography margin="0px 15px 15px 21px">Are you sure want to delete?</Typography>
        <Box
          sx={{
            '& .MuiTextField-root': { mb: 1, mt: 1 },
            '& .react-tel-input.focused': {
              borderColor: theme.palette.primary.main
            },
            m: 2
          }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
            <Grid item>
              <Button
                sx={{ mt: 1, mb: 1, px: 2 }}
                type="button"
                variant="contained"
                color="primary"
                onClick={userdelete}
                aria-label="button"
                style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Yes'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: 1, mb: 1, px: 2 }}
                variant="contained"
                onClick={deleteDialogClose}
                color="warning"
                style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      <Dialog
        open={openView}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            Department Details
          </Typography>
        </Toolbar>
        <TableContainer sx={{ px: 2 }}>
          <Paper>
            <Table aria-label="simple table" size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="grey">
                      Department ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{details?.id}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="grey">
                      Department Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{details?.name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="grey">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Chip
                        label={details?.status === '1' ? 'active' : 'Inactive'}
                        size="small"
                        color={details?.status === '1' ? 'primary' : 'error'}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
        <Grid container justifyContent="space-between" alignItems="baseline" direction="row">
          <Grid item />
          <Grid item>
            <Button
              sx={{ mt: 2, mb: 2, px: 3, mr: 2 }}
              // fullWidth
              variant="contained"
              onClick={handleViewClose}
              color="warning">
              Close
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default DepartmentPage;
