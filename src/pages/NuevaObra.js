import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import Page from "../components/Page";
import NewObraForm from "../components/NewObraForm";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(0, 0)
}));

export default function NuevaObra() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ maxHeight: "100vh" }}
    >
      <Card sx={{ minHeight: 580 }}>
        <CardContent>
          <RootStyle title="Nueva obra">
            <Container>
              <ContentStyle>
                <Box sx={{ mb: 5 }}>
                  <Typography variant="h4" gutterBottom>
                    Nueva obra
                  </Typography>
                </Box>

                <NewObraForm />
              </ContentStyle>
            </Container>
          </RootStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
