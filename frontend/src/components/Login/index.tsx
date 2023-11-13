import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

import { login } from "../../api/auth";
import { defaultLoginValues, validationSchema } from "./constants";
import { UserSignInInput } from "../../types/user";
import { useUserContext } from "../../context/UserContext";

const defaultTheme = createTheme();

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInInput>({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleSignIn = async (data: UserSignInInput) => {
    try {
      setLoading(true);
      const response = await login(data);
      localStorage.setItem("token", response.data.accessToken);

      setUser(response.data.user);

      navigate("/");
      setLoading(false);
    } catch (error: any) {
      const { message = "" } = error?.response?.data;
      if (message) toast(message, { type: "error" });
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <Typography color="error">
                          {errors.email.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      {errors.password && (
                        <Typography color="error">
                          {errors.password.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
            >
              {loading && (
                <Box sx={{ display: "flex", mr: 2 }}>
                  <CircularProgress sx={{ color: "#FFFFFF" }} size={20} />
                </Box>
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
