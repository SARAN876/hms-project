import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PATH_DASHBOARD } from '../../routes/paths';
import { fetchSignupService } from '../../services/siginupService';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      hotel_name: data.get('hotel_name'),
      email: data.get('email'),
      password: data.get('password')
    };
    const accessToken = await fetchSignupService(user);
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    handelNvigate(accessToken);
  };
  const handelNvigate = (accessToken) => {
    if (accessToken?.data?.data?.access_token) {
      navigate(PATH_DASHBOARD.dash);
    } else {
      console.log('Account Details not found');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="hotel_name"
                    label="Hotel Name"
                    name="hotel_name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="fa6-solid:hotel"
                            color="rgb(156, 39, 176)"
                            width="24"
                            height="24"
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="clarity:email-solid"
                            color="rgb(156, 39, 176)"
                            width="24"
                            height="24"
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password *"
                    fullWidth
                    margin="normal"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:lock"
                            color="rgb(156, 39, 176)"
                            width="24"
                            height="24"
                          />
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? (
                              <Icon
                                icon="carbon:view-off-filled"
                                color="rgb(156, 39, 176)"
                                width="24"
                                height="24"
                              />
                            ) : (
                              <Icon
                                icon="carbon:view-filled"
                                color="rgb(156, 39, 176)"
                                width="24"
                                height="24"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
