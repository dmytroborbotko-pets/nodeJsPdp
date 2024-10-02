import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [timeout, setTimeoutSuccess] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        overflow: "hidden",
        opacity: timeout ? 0.5 : 1,
      }}
    >
      {timeout && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="white" fontWeight="bold">
            Login successful!
          </Typography>
        </Box>
      )}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            const loginData = await login(values).unwrap();
            if (loginData) {
              console.log(loginData);
              localStorage.setItem("token", loginData.token);
              localStorage.setItem("user", loginData.userId);
              setSubmitting(false);

              setTimeoutSuccess(true);
              setTimeout(() => {
                setTimeoutSuccess(false);
                navigate("/");
              }, 1000);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
