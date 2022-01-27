import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import React from "react";
import _ from "lodash";
import { apiUrl, validateUsername } from "../utility/function";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { userExists, register } from "../utility/request";
import { validateEmail, validatePassword } from "../utility/function";

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
  const [userExistsResult, userExistsMutation] = useMutation(userExists);
  const [registerResult, registerMutation] = useMutation(register);

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailExists, setEmailExists] = React.useState<boolean>(false);
  const [usernameExists, setUsernameExists] = React.useState<boolean>(false);

  const [emailSuccess, setEmailSuccess] = React.useState<boolean>(false);
  const [usernameSuccess, setUsernameSuccess] = React.useState<boolean>(false);

  const [registerState, setRegisterState] = React.useState<RegisterState>(
    RegisterState.pending
  );

  enum DebounceArg {
    email = "email",
    username = "username",
  }

  const debounceInputCb = (
    arg: DebounceArg,
    setInputExists: (value: React.SetStateAction<boolean>) => void,
    setInputSuccess: (value: React.SetStateAction<boolean>) => void
  ) => {
    return async (nextValue: string) => {
      if (!nextValue) {
        setInputExists(false);
        setInputSuccess(false);
        return;
      }
      const res = await userExistsMutation({ [arg]: nextValue });
      if (res.data?.userExists) {
        setInputExists(true);
        setInputSuccess(false);
        return;
      }
      setInputExists(false);
      setInputSuccess(true);
    };
  };

  // todo: reusable login/register component
  const debounceEmail = React.useRef(
    _.debounce(
      debounceInputCb(
        //
        DebounceArg.email,
        setEmailExists,
        setEmailSuccess
      ),
      1000
    )
  ).current;

  const debounceUsername = React.useRef(
    _.debounce(
      debounceInputCb(
        DebounceArg.username,
        setUsernameExists,
        setUsernameSuccess
      ),
      1000
    )
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await registerMutation({
      email,
      username,
      password,
    });
    console.log(res);
    if (res.error) {
      setRegisterState(RegisterState.failure);
      return;
    }
    setRegisterState(RegisterState.success);
    setTimeout(() => {
      navigate("login");
    }, 2000);
  };

  interface InputError {
    isError: boolean;
    helperText: JSX.Element | string;
  }

  const bad = { isError: true };
  const good = { isError: false, helperText: "" };

  const emailError = (): InputError => {
    if (emailExists) {
      return { ...bad, helperText: "email already registered" };
    }
    if (email && !validateEmail(email)) {
      return { ...bad, helperText: "invalid email" };
    }
    return good;
  };

  const usernameError = (): InputError => {
    if (usernameExists) {
      return { ...bad, helperText: "username already exists" };
    }
    if (username && !validateUsername(username)) {
      return {
        ...bad,
        helperText: "5-15 characters, letters and number only",
      };
    }
    return good;
  };

  const passwordError = (): InputError => {
    if (password && !validatePassword(password)) {
      return {
        ...bad,
        helperText: "at least 8 characters, at least one special character",
      };
    }
    return good;
  };

  const passwordSuccess = (): boolean => {
    return password !== "" && validatePassword(password);
  };

  const registerEnabled = (): boolean => {
    if (!passwordSuccess()) return false;
    if (!emailSuccess || !usernameSuccess) return false;
    return true;
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
            error={emailError().isError}
            helperText={emailError().helperText}
            color={email && emailSuccess ? "success" : "primary"}
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
            error={usernameError().isError}
            helperText={usernameError().helperText}
            color={username && usernameSuccess ? "success" : "primary"}
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
            error={passwordError().isError}
            helperText={passwordError().helperText}
            color={passwordSuccess() ? "success" : "primary"}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auto-register__submit"
            sx={{ mt: 3, mb: 2 }}
            disabled={!registerEnabled()}
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
