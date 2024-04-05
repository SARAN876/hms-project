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
import { MenuItem } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SpokeSharpIcon from '@mui/icons-material/SpokeSharp';
import { createRoleList, updateRoleList, deleteRoleList } from '../store/roleSlice';
import 'react-phone-input-2/lib/material.css';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
  { label: 'Manager', value: 'manager' },
  { label: 'Employee', value: 'employee' },
  { label: 'Owner', value: 'owner' }
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
const RolesPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersData = useSelector(({ role }) => role.rolelist);
  const userscount = useSelector(({ role }) => role.roleCount);
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
  const [filteredUserList, setFilteredUserList] = useState(usersData);
  const [filterRole, setFilterRole] = useState('');

  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'createdAt'
  });
  const defaultValues = {
    id: '',
    role: '',
    status: ''
  };
  const RoleSchema = Yup.object().shape({
    role: Yup.string()
      .required('Role name is required')
      .min(3, 'Role name must be at list 3 char')
      .max(30, 'Make Should not exceed 30'),
    status: Yup.string().required('Status is required')
  });
  const methods = useForm({
    resolver: yupResolver(RoleSchema),
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
    dispatch(deleteRoleList(removeData)).then((res) => {
      if (res && res.payload) {
        setOpen(false);
      }
    });
  };

  const handleViewOpen = (data) => {
    // setDetails(data);
    // setopenView(true);
    navigate(`/roles/${data.id}`, { state: { userDetailes: data } });
  };
  const handleViewClose = () => {
    setopenView(false);
  };
  const rows = [
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: 'Role ID',
      sort: true
    },
    {
      id: 'role',
      align: 'left',
      disablePadding: false,
      label: 'Role Name',
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
    setFilteredUserList(usersData);
  }, [usersData]);

  const createRole = () => {
    setCreateStatus(true);
    setOpenDialog(true);
  };

  const closeRole = () => {
    setCreateStatus(false);
    setOpenDialog(false);
    reset();
  };
  // const setFormData = (data1, data2) => {
  //   Object.keys(data1).map(function (key1) {
  //     Object.keys(data2).map(function (key2) {
  //       if (key1 === key2) {
  //         data1[key1] = data2[key2];
  //       }
  //     });
  //   });
  // };
  const updateFun = (data) => {
    // setFormData(defaultValues, data);
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

    const filteredList = usersData.filter(
      (user) =>
        user.role.toLowerCase().includes(data.toLowerCase()) ||
        user.id.toLowerCase().includes(data.toLowerCase())
    );

    setFilteredUserList(filteredList);
  };
  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
    const filteredData =
      event.target.value === 'all'
        ? usersData
        : usersData.filter((item) => item.role === event.target.value);
    setFilteredUserList(filteredData);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (createStatus) {
      delete data.id;
      dispatch(createRoleList(data)).then((res) => {
        if (res && res.payload) {
          setCreateStatus(false);
          setOpenDialog(false);
          reset();
        }
      });
    } else {
      dispatch(updateRoleList(data)).then((res) => {
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
            <SpokeSharpIcon color="#004e49" width="25" height="28" />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Roles
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
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
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
                    <Typography variant="title">{res.role}</Typography>
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
            {createStatus ? 'Create' : 'Update'} Role
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
              id="role"
              name="role"
              size="small"
              type="text"
              label="Role"
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
            Role Details
          </Typography>
        </Toolbar>
        <TableContainer sx={{ px: 2 }}>
          <Paper>
            <Table aria-label="simple table" size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="grey">
                      Role ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{details?.id}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="grey">
                      Role
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{details?.role}</Typography>
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

export default RolesPage;
