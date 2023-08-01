import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import { fetchForgotService } from '../../services/siginupService';
const defaultTheme = createTheme();

export default function Forgot() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
      favourite_pet: data.get('favourite_pet'),
      favourite_book: data.get('favourite_book')
    };
    const accessToken = await fetchForgotService(user);
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken?.data?.data?.access_token);
    handelNvigate(accessToken?.data?.data?.access_token);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              id="password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="favourite_pet"
              label="Favourite Pet"
              name="favourite_pet"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="ic:outline-pets" color="rgb(156, 39, 176)" width="24" height="24" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="favourite_book"
              label="Favourite Book"
              id="favourite_book"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:book-bold" color="rgb(156, 39, 176)" width="24" height="24" />
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs />

              <Grid item>
                <Link href="/login" variant="body2">
                  {'SIGN IN'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
