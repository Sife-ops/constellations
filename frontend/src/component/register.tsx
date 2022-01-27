import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import React from "react";
import _ from "lodash";
import { apiUrl } from "../utility/function";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { userExists } from "../utility/request";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

enum RegisterState {
  success = "success",
  failure = "failure",
  pending = "pending",
}

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [userEsxistsResult, userExistsMutation] = useMutation(userExists);

  const [emailExists, setEmailExists] = React.useState<boolean>(false);
  const [usernameExists, setUsernameExists] = React.useState<boolean>(false);

  const [registerState, setRegisterState] = React.useState<RegisterState>(RegisterState.pending);

  // todo: abstract debounce functions
  // todo: reusable login/register component
  const debounceEmail = React.useRef(
    _.debounce((nextValue) => {
      userExistsMutation({ email: nextValue }).then((res) => {
        if (res.data?.userExists) return setEmailExists(true);
        setEmailExists(false);
      });
    }, 1000)
  ).current;

  const debounceUsername = React.useRef(
    _.debounce((nextValue) => {
      userExistsMutation({ username: nextValue }).then((res) => {
        if (res.data?.userExists) return setUsernameExists(true);
        setUsernameExists(false);
      });
    }, 1000)
  ).current;

  const handleEmail = (e: any) => {
    const { value: nextValue } = e.target;
    setEmail(nextValue);
    debounceEmail(nextValue);
  };

  const handleUsername = (e: any) => {
    const { value: nextValue } = e.target;
    setUsername(nextValue);
    debounceUsername(nextValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${apiUrl()}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    }).then((res) => {
      if (!res.ok) {
        setRegisterState(RegisterState.failure);
        return;
      }
      setRegisterState(RegisterState.success);
      setTimeout(() => {
        navigate("login");
      }, 3000);
    });
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
          <AppRegistrationIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            className="auto-register__emailInput"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmail}
            error={emailExists ? true : false}
            helperText={emailExists ? "email already registered" : ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="username"
            type="username"
            id="username"
            className="auto-register__usernameInput"
            autoComplete="username"
            value={username}
            onChange={handleUsername}
            error={usernameExists ? true : false}
            helperText={usernameExists ? "username already registered" : ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            className="auto-register__passwordInput"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auto-register__submit"
            sx={{ mt: 3, mb: 2 }}
            color={
              registerState === "pending"
                ? "primary"
                : registerState === "success"
                ? "success"
                : "error"
            }
          >
            {registerState === "pending"
              ? "Sign up"
              : registerState === "success"
              ? "Success!"
              : "Oops!"}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className="auto-register__registerLink"
                href="/login"
                variant="body2"
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
