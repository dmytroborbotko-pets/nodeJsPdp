import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();

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
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{ name: "", surname: "", email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default RegistrationPage;
