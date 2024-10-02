import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  api,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
  useLogoutQuery,
} from "../services/api";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john@example.com",
  });

  const { data: userData, isLoading } = useGetUserByIdQuery(
    localStorage.getItem("user")
  );

  const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [logout, { isLoading: isLoadingLogout }] = api.useLazyLogoutQuery();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editUser({ userId: localStorage.getItem("user"), body: user });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUser({
      username: userData?.user.username,
      email: userData?.user.email,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteUser(localStorage.getItem("user"));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setShowDeleteModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    const resultLogout = await logout({}).unwrap();
    if (resultLogout.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userData) {
      setUser({
        username: userData.user.username,
        email: userData.user.email,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [localStorage.getItem("user")]);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={
                !isEditing ||
                isLoadingEdit ||
                isLoadingDelete ||
                isLoadingLogout
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              disabled={
                !isEditing ||
                isLoadingEdit ||
                isLoadingDelete ||
                isLoadingLogout
              }
            />
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              {!isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  disabled={isLoadingEdit || isLoadingDelete || isLoadingLogout}
                  sx={{
                    opacity:
                      isLoadingEdit || isLoadingDelete || isLoadingLogout
                        ? 0.5
                        : 1,
                  }}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={
                      isLoadingEdit || isLoadingDelete || isLoadingLogout
                    }
                    sx={{
                      opacity:
                        isLoadingEdit || isLoadingDelete || isLoadingLogout
                          ? 0.5
                          : 1,
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    disabled={
                      isLoadingEdit || isLoadingDelete || isLoadingLogout
                    }
                    sx={{
                      opacity:
                        isLoadingEdit || isLoadingDelete || isLoadingLogout
                          ? 0.5
                          : 1,
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => setShowDeleteModal(true)}
                disabled={isLoadingEdit || isLoadingDelete || isLoadingLogout}
                sx={{
                  opacity:
                    isLoadingEdit || isLoadingDelete || isLoadingLogout
                      ? 0.5
                      : 1,
                }}
              >
                Delete User
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleLogout}
                disabled={isLoadingEdit || isLoadingDelete || isLoadingLogout}
                sx={{
                  opacity:
                    isLoadingEdit || isLoadingDelete || isLoadingLogout
                      ? 0.5
                      : 1,
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteModal(false)}
            color="primary"
            disabled={isLoadingEdit || isLoadingDelete || isLoadingLogout}
            sx={{
              opacity:
                isLoadingEdit || isLoadingDelete || isLoadingLogout ? 0.5 : 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={isLoadingEdit || isLoadingDelete || isLoadingLogout}
            sx={{
              opacity:
                isLoadingEdit || isLoadingDelete || isLoadingLogout ? 0.5 : 1,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProfilePage;
