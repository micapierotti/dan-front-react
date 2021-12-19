// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";

import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Bienvenido | Sistema Corralón">
      <Container container maxWidth="xl" alignItems="center" justifyContent="center">
        <Box sx={{ pb: 5 }} align="center" justifyContent="center">
          <Typography variant="h4" aling="center">
            Hola, bienvenido al Sistema de Corralón
          </Typography>
        </Box>
        <img src="https://corralonlasquintas.com.ar/img/slider/corralon-las-quintas.jpg" alt="logo" />
      </Container>
    </Page>
  );
}
