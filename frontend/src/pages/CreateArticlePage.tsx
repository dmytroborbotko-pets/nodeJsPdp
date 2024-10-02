import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateArticleMutation } from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [timeout, setTimeoutResult] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [
    createArticle,
    { isLoading: isLoadingArticle, error: errorCreate },
  ]: any = useCreateArticleMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length > 100) {
      alert("Title cannot be more than 100 characters");
      return;
    }
    try {
      const result = await createArticle({
        title,
        content,
        author: localStorage.getItem("user"),
        type: visibility,
      }).unwrap();
      if (errorCreate?.data === "Forbidden") {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      if (result.success) {
        setTimeoutResult(true);
        setTimeout(() => {
          setTimeoutResult(false);
          navigate("/");
        }, 2000);
        return;
      }
      alert("Failed to create article");
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [localStorage.getItem("user")]);

  return (
    <Container
      maxWidth="md"
      sx={{ px: { xs: 2, sm: 3 }, opacity: timeout ? 0.5 : 1 }}
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
            Article created successfully!
          </Typography>
        </Box>
      )}
      <Paper
        elevation={3}
        sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: { xs: 2, sm: 3, md: 4 } }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          Create Article
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            error={title.length > 100}
            helperText={
              title.length > 100 ? "Title cannot exceed 100 characters" : ""
            }
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          />
          <TextField
            fullWidth
            minRows={4}
            maxRows={9999999}
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup
              row
              aria-label="visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/")}
              fullWidth={isMobile}
              sx={{ mb: isMobile ? 1 : 0, opacity: isLoadingArticle ? 0.5 : 1 }}
              disabled={isLoadingArticle}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={isMobile}
              sx={{ opacity: isLoadingArticle ? 0.5 : 1 }}
              disabled={isLoadingArticle}
            >
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateArticlePage;
