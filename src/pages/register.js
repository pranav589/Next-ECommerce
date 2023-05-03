import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import valid from "@/utils/valid";
import { apiCall } from "@/utils/apiCall";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";

const theme = createTheme();

export default function Register() {
  const initialData = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialData);
  const { name, email, password, confirmPassword } = userData;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const errorMessage = valid(name, email, password, confirmPassword);

    if (errorMessage) return toast.error(errorMessage);
    try {
      const data = {
        email: email,
        name: name,
        password: CryptoJS.AES.encrypt(password, "secret key 1").toString(),
        confirmPassword: CryptoJS.AES.encrypt(
          confirmPassword,
          "secret key 1"
        ).toString(),
      };
      const res = await apiCall("POST", "auth/register", "", data);
      setIsLoading(false);
      toast.success(res?.data?.msg);
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Register Page</title>
      </Head>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#539165" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={userData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
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
                value={userData?.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={userData.confirmPassword}
                onChange={handleChange}
              />

              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: "#539165",
                    marginLeft: "50%",
                    mt: 3,
                    mb: 2,
                  }}
                  size={20}
                />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "#539165",
                    "&:hover": { background: "#539165" },
                  }}
                >
                  Register
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2" color={"#539165"}>
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href={"/login"} variant="body2" color={"#539165"}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
