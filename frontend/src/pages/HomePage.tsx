import {
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useGetArticlesWithAuthorQuery } from "../services/api";
import { Article } from "../types/dataTypes";

function HomePage() {
  const navigate = useNavigate();
  const { data: articles, isLoading: isArticlesLoading } =
    useGetArticlesWithAuthorQuery({});

  if (isArticlesLoading) {
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
    <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
      >
        Articles
      </Typography>
      {articles && articles.length === 0 ? (
        <Typography variant="h6" component="p" sx={{ mt: 2 }}>
          No articles for now!
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {articles?.map((article: Article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/article/${article._id}`)}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      noWrap
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      {article.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: "0.875rem",
                        },
                      }}
                    >
                      {moment(article.createdAt).format("DD MMM, YYYY")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomePage;
