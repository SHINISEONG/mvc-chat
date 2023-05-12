import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Backdrop } from '@mui/material';
import useInput from '@/hooks/useInput';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Typography component={Link} to="/" color={'Green'}>
        MVC Shop
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [signInErrorMsg, setSignInErrorMsg] = useState();
  const [backdropOpen] = useState(true);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
    fetcher
  );

  console.log(
    `${import.meta.env.VITE_SPRING_SVR_URL}/api/users/session`,
    myData
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        userId: data.get('userId'),
        password: data.get('password'),
      });

      axios
        .post(
          `http://${
            import.meta.env.VITE_SPRING_SVR_URL
          }:8080/api/users/session`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          setSignInErrorMsg(response.data);
          console.log(response.data);
          mutateMe();
        })
        .catch((error) => {
          console.log(error);
          setSignInErrorMsg(error.response.data);
        });
    },
    [userId, password]
  );
  if (myData === undefined) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      />
    );
  }
  if (myData.userId !== undefined && myData.userId !== null) {
    return <Navigate replace to="/" />;
  }
  return (
    <Grid
      container
      component="main"
      sx={{ height: '100vh', marginTop: '64px' }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://as1.ftcdn.net/v2/jpg/05/30/81/30/1000_F_530813029_XMXEvLZr5K4ntqqDgJzwxhbgO7W2ShiB.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={'primary'}>
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="Your ID"
              name="userId"
              autoFocus
              value={userId}
              onChange={onChangeUserId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChangePassword}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Typography variant="overline" color="secondary">
              {signInErrorMsg}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: 1 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Typography component={Link} to="/users/signup" color={'Green'}>
                  Don't have an account? Sign Up
                </Typography>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
