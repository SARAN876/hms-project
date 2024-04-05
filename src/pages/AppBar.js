import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { List, ListItemButton, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import SpokeSharpIcon from '@mui/icons-material/SpokeSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import Message from '../components/formsy/message/Message';
import { ProgressBarStyle } from '../components/ProgressBar';
import { PATH_AUTH } from '../routes/paths';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#1976d2',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#9ffcc980',
      main: '#1dce6e',
      dark: '#1dce6e',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#006097',
      main: '#FF8000',
      dark: '#006097',
      contrastText: '#272727'
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF'
    }
  }
});
function APPBar() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const loading3 = useSelector(({ loading }) => loading.loading3);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const GoogleLogOut = () => {
    // localStorage.removeItem('access_token', null);
    // navigate(PATH_DASHBOARD.login);
    localStorage.removeItem('accessToken');
    window.location.href = PATH_AUTH.login;
  };

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px'
              }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' })
                }}>
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="white"
                noWrap
                sx={{ flexGrow: 1 }}
                textAlign="center">
                Dashboard
              </Typography>

              <Button
                variant="contained"
                bgcolor="#f2c90f"
                onClick={() => GoogleLogOut()}
                to="/login"
                component={Link}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
              }}>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item>
                  {open && (
                    <Box display="flex" justifyContent="start">
                      <img src="logohms.png" width={45} />
                      <Typography sx={{ mr: 2, ml: 2 }} fontWeight={'bold'} variant="h6">
                        HMS
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  <IconButton color="inherit" sx={{ ml: 4 }} onClick={() => handleDrawerClose()}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
            <Divider />
            <List sx={{ mt: 2, color: 'black' }}>
              <ListItemButton
                to="/dashboard"
                component={Link}
                role="button"
                selected={location.pathname === '/dashboard'}>
                <ListItemIcon>
                  <DashboardSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                to="/users"
                component={Link}
                role="button"
                selected={location.pathname === '/users'}>
                <ListItemIcon>
                  <PeopleAltSharpIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItemButton>
              <ListItemButton
                to="/department"
                component={Link}
                role="button"
                selected={location.pathname === '/department'}>
                <ListItemIcon>
                  <SortSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Department List" />
              </ListItemButton>
              <ListItemButton
                to="/roles"
                component={Link}
                role="button"
                selected={location.pathname === '/roles'}>
                <ListItemIcon>
                  <SpokeSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Roles List" />
              </ListItemButton>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto'
            }}>
            <Toolbar />
            <Message />
            <ProgressBarStyle />
            {loading3 ? (
              <LinearProgress sx={{ mt: 0, mb: 2 }} color="warning" />
            ) : (
              <Typography sx={{ m: 2.5 }} />
            )}
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default APPBar;
