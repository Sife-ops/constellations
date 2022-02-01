import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { login } from "../utility/request";
import { useMutation } from "urql";

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
} from "@mui/material";

export const Login: React.FC = () => {
  const [loginResult, loginMutation] = useMutation(login);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState<boolean>(false);

  const [error, setError] = React.useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await loginMutation({ email, password, remember });
    if (res.error) {
      setError(true);
      return;
    }
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            helperText={error ? "Incorrect email or password." : ""}
          />

          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={remember}
                onChange={(e) => {
                  setRemember((s) => (s ? false : true));
                }}
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
            disabled={email && password ? false : true}
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
      </Box>
    </Container>
  );
};
