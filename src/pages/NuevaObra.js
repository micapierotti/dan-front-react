import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import Page from "../components/Page";
import NewObraForm from "../forms/NewObraForm";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(0, 0),
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
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                  >
                    <Typography variant="h4" gutterBottom>
                      Nueva obra
                    </Typography>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/dashboard/obras"
                      startIcon={<Icon icon="eva:arrow-back-fill" />}
                    >
                      Atrás
                    </Button>
                  </Stack>
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
