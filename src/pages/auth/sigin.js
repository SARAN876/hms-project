import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Container,
  Typography,
  Button,
  styled,
  Box,
  Avatar
} from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
// import { fetchLoginService } from '../../services/siginupService';
import { PATH_DASHBOARD } from '../../routes/paths';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '../../components/hooks/index';
import FormProvider from '../../components/FormProvider';
// import { useAuth } from '../../components/auth/useAuthContext';

const defaultTheme = createTheme();
const ContentStyle = styled('div')(() => ({
  maxWidth: 360,
  justifyContent: 'center',
  flexDirection: 'column'
}));

export default function SignInSide() {
  const navigate = useNavigate();
  // const { logIn } = useAuth();
  // console.log(logIn);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const [showPassword, setShowPassword] = React.useState(false);

  const defaultValues = {
    email: '',
    password: '',
    remember: true
  };
  const RoleSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email')
      .max(50, 'Email Should not exceed 50'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        'Password Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
      .max(30, 'Password length should not exceed 30')
  });
  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues
  });

  const {
    // reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const user = { email: data.get('email'), password: data.get('password') };
  //   // const response = await login(data.username, data.password);
  //   // console.log(response);
  //   const accessToken = await fetchLoginService(user);
  //   localStorage.setItem('accessToken', accessToken?.data?.data?.access_token);
  //   handelNvigate(accessToken);
  // };
  const handelNvigate = (accessToken) => {
    if (accessToken) {
      navigate(PATH_DASHBOARD.dash);
    } else {
      console.log('Account Details not found');
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('accessToken', data);
    handelNvigate(data);
    // reset();
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                Sign in
              </Typography>
              <Container maxWidth="sm">
                <ContentStyle>
                  <Stack spacing={2.5} sx={{ mt: 1, mb: 1 }}>
                    {!!errors.afterSubmit && (
                      <Alert severity="error">{errors.afterSubmit.message}</Alert>
                    )}

                    <RHFTextField
                      name="email"
                      label="Email address *"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon color="rgb(156, 39, 176)" icon={'material-symbols:mail'} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <RHFTextField
                      name="password"
                      label="Password *"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon color="rgb(156, 39, 176)" icon={'mdi:password'} />
                          </InputAdornment>
                        ),

                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Icon
                                color="rgb(156, 39, 176)"
                                icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                              />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}>
                    {/* <RHFCheckbox name="remember" label="Remember me" /> */}
                    <Link
                      href="/forgot"
                      variant="body2"
                      // color="rgb(49,171,86)"
                      underline="always">
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}>
                    Login
                  </Button>

                  <Stack direction="row" spacing={0.5} sx={{ mt: 2, ml: 2 }}>
                    <Typography variant="body2">New user?</Typography>

                    <Link to="" variant="subtitle2">
                      Create an account
                    </Link>
                  </Stack>
                  <Divider
                    sx={{
                      my: 1.5,
                      typography: 'overline',
                      color: 'text.disabled',
                      '&::before, ::after': {
                        borderTopStyle: 'dashed'
                      }
                    }}>
                    OR
                  </Divider>

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      color="info"
                      variant="outlined"
                      disabled={loading1}
                      // onClick={() => Google()}
                      sx={{ width: '1000px' }}
                      fullWidth
                      size="large">
                      {/* <Iconify
                      icon="flat-color-icons:google"
                      width="58px"
                      height="24px"
                      // color={theme.palette.info.main}
                      ml="-10"
                    /> */}
                      Sign in with Google{' '}
                      <div style={{ marginLeft: '20px' }}>
                        {' '}
                        {loading1 && <CircularProgress size={14} color="warning" />}
                      </div>
                    </Button>
                  </Stack>
                </ContentStyle>
              </Container>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
