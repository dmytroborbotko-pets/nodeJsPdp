import React, { useState } from "react";
import {
  useGetArticleByIdQuery,
  useGetUserByIdQuery,
  useEditArticleMutation,
  useDeleteArticleMutation,
} from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import moment from "moment";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [timeout, setTimeoutResult] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const { data: article, isLoading: isLoadingArticle } =
    useGetArticleByIdQuery(id);
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(
    article?.data?.author,
    { skip: !article }
  );
  const [editArticle, { isLoading: isLoadingEdit }] = useEditArticleMutation();
  const [
    deleteArticle,
    { isLoading: isLoadingDelete, error: errorDelete },
  ]: any = useDeleteArticleMutation();

  const currentUserId = localStorage.getItem("user");
  const isAuthor = currentUserId === user?.user?._id;

  if (isLoadingArticle || isLoadingUser) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(article?.data?.title);
    setEditedContent(article?.data?.content);
  };

  const handleSave = async () => {
    if (editedTitle.length < 1 || editedContent.length < 1) {
      return;
    }
    try {
      await editArticle({
        articleId: id,
        body: {
          title: editedTitle,
          content: editedContent,
        },
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const deletedArticle = await deleteArticle(id).unwrap();
      if (errorDelete?.data === "Forbidden") {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (deletedArticle.success) {
        setTimeoutResult(true);
        setTimeout(() => {
          setTimeoutResult(false);
          navigate("/");
        }, 2000);
        return;
      }
      alert("Failed to delete article");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 }, opacity: timeout ? 0.5 : 1 }}
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
            Article deleted successfully!
          </Typography>
        </Box>
      )}
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            {article?.data?.title}
          </Typography>
        )}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          By {user?.user.username ?? "Deleted account"} |{" "}
          {moment(article?.data?.createdAt).format("MMMM D, YYYY")}
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            multiline
            minRows={1}
            maxRows={99999}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <Typography
            variant="body1"
            paragraph
            sx={{ mt: 2, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {article?.data?.content}
          </Typography>
        )}
        {isAuthor && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
            }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  fullWidth={isMobile}
                  disabled={isLoadingEdit}
                  sx={{ opacity: isLoadingEdit || isLoadingDelete ? 0.5 : 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                  fullWidth={isMobile}
                  disabled={isLoadingEdit || isLoadingDelete}
                  sx={{ opacity: isLoadingEdit || isLoadingDelete ? 0.5 : 1 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  fullWidth={isMobile}
                  disabled={isLoadingEdit || isLoadingDelete}
                  sx={{ opacity: isLoadingEdit || isLoadingDelete ? 0.5 : 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  fullWidth={isMobile}
                  disabled={isLoadingEdit || isLoadingDelete}
                  sx={{ opacity: isLoadingEdit || isLoadingDelete ? 0.5 : 1 }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ArticlePage;
