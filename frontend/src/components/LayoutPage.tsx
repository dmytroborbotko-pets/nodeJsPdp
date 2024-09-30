import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Container,
  Fab,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function LayoutPage({ children }: { children: React.ReactElement }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          {(location.pathname === "/profile" ||
            location.pathname === "/create-article" ||
            location.pathname === "/user" ||
            location.pathname === "/article") && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="go back"
              onClick={() => navigate(-1)}
              sx={{ marginRight: 'auto' }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            onClick={() => navigate("/profile")}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, mt: 2 }}>
        {children}
      </Container>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/create-article")}
        >
          <AddCircleIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default LayoutPage;
