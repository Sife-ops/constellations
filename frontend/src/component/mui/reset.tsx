import React from 'react';
import EmailIcon from '@mui/icons-material/Email';

import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';

export const Reset: React.FC = () => {
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
          <EmailIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Reset password
        </Typography>

        <Typography component="p" variant="subtitle1">
          Send an email with a link to reset your password.
        </Typography>

        <Box
          component="form"
          // onSubmit={handleSubmit}
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
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" className="auto-login__submit" sx={{ mt: 3, mb: 2 }}>
            Reset
          </Button>

          <Grid container>
            <Grid item>
              <Link className="auto-login__registerLink" href="/login" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
