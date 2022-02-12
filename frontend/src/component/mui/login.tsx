import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { Formik } from 'formik';
import { ex } from '../../utility/constant';
import { useLoginMutation } from '../../generated/graphql';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginResult, loginMutation] = useLoginMutation();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validate={(values) => {
            const errors: { email?: string } = {};
            const emailError = (s: string): string | undefined => {
              if (s === '') return undefined;
              const isValid = ex.email.test(s.toLowerCase());
              if (!isValid) return 'invalid email address';
              return undefined;
            };
            const email = emailError(values.email);
            if (email) errors.email = email;
            return errors;
          }}
          onSubmit={async (
            { email, password, remember },
            { setSubmitting }
          ) => {
            setSubmitting(true);
            const res = await loginMutation({
              email,
              password,
              remember,
            });
            if (res.error) {
              return navigate('/reset');
            }
            window.location.reload();
          }}
        >
          {({
            //
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            values,
          }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                className="auto-login__emailInput"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={errors.email !== '' && errors.email !== undefined}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                className="auto-login__passwordInput"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                // error={}
                // helperText={}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={values.remember}
                    onChange={() => setFieldValue('remember', !values.remember)}
                  />
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="auto-login__submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    className="auto-login__registerLink"
                    href="/register"
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
