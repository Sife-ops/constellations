import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import React from "react";
import _ from "lodash";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { userExists, register } from "../utility/request";

import {
  emailIsValid,
  passwordIsValid,
  usernameIsValid,
} from "../utility/function";

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

enum Tristate {
  true = "true",
  false = "false",
  default = "default",
}

enum UserExistsVariable {
  email = "email",
  username = "username",
}

type InputError = [boolean, string];

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [userExistsResult, userExistsMutation] = useMutation(userExists);
  const [registerResult, registerMutation] = useMutation(register);

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // todo: change to emailAvailable?
  const [emailExists, setEmailExists] = React.useState<Tristate>(
    Tristate.default
  );
  const [usernameExists, setUsernameExists] = React.useState<Tristate>(
    Tristate.default
  );

  const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);

  const debounceInputCb = (
    variable: UserExistsVariable,
    setInputExists: React.Dispatch<React.SetStateAction<Tristate>>
  ) => {
    return async (nextValue: string) => {
      const res = await userExistsMutation({ [variable]: nextValue });
      if (res.data?.userExists) {
        setInputExists(Tristate.true);
        return;
      }
      setInputExists(Tristate.false);
    };
  };

  const debounceEmail = React.useRef(
    _.debounce(debounceInputCb(UserExistsVariable.email, setEmailExists), 1000)
  ).current;

  const debounceUsername = React.useRef(
    _.debounce(
      debounceInputCb(UserExistsVariable.username, setUsernameExists),
      1000
    )
  ).current;

  // todo: use event types
  const handleEmail = (e: any) => {
    setEmailExists(Tristate.default);
    setEmail(e.target.value);
    debounceEmail(e.target.value);
  };

  const handleUsername = (e: any) => {
    setUsernameExists(Tristate.default);
    setUsername(e.target.value);
    debounceUsername(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await registerMutation({ email, username, password });
    if (res.error) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      navigate("login");
    }, 2000);
  };

  const emailError = (): InputError => {
    if (email !== "" && !emailIsValid(email)) {
      return [true, "invalid email"];
    }
    if (emailExists === Tristate.true) {
      return [true, "already registered"];
    }
    return [false, ""];
  };

  const usernameError = (): InputError => {
    if (username !== "" && !usernameIsValid(username)) {
      return [true, "5-15 characters, letters and number only"];
    }
    if (usernameExists === Tristate.true) {
      return [true, "username unavailable"];
    }
    return [false, ""];
  };

  const passwordError = (): InputError => {
    if (password !== "" && !passwordIsValid(password)) {
      return [
        true,
        "Use at least 8 characters, one number, and one special character.",
      ];
    }
    return [false, ""];
  };

  const [emailIsError, emailHelperText] = emailError();
  const [usernameIsError, usernameHelperText] = usernameError();
  const [passwordIsError, passwordHelperText] = passwordError();

  const emailColor = () => {
    if (email !== "" && emailExists === Tristate.false) return "success";
    return "primary";
  };

  const usernameColor = () => {
    if (username !== "" && usernameExists === Tristate.false) return "success";
    return "primary";
  };

  const passwordColor = () => {
    if (password !== "" && passwordIsValid(password)) return "success";
    return "primary";
  };

  const registerDisabled = (): boolean => {
    if (emailExists !== Tristate.false || !emailIsValid(email)) {
      return true;
    }
    if (usernameExists !== Tristate.false || !usernameIsValid(username)) {
      return true;
    }
    if (!passwordIsValid(password)) return true;
    return false;
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
            error={emailIsError}
            helperText={emailHelperText}
            color={emailColor()}
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
            error={usernameIsError}
            helperText={usernameHelperText}
            color={usernameColor()}
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
            error={passwordIsError}
            helperText={passwordHelperText}
            color={passwordColor()}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auto-register__submit"
            sx={{ mt: 3, mb: 2 }}
            disabled={registerDisabled()}
            color={registerSuccess ? "success" : "primary"}
          >
            {registerSuccess ? "Done" : "Sign Up"}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
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
