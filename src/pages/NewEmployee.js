import { filter } from "lodash";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
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
// components
import NewEmployeeForm from "../forms/NewEmployeeForm";
import Page from "../components/Page";
//
import USERLIST from "../_mocks_/user";
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function NewEmployee() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("username");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

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
          <RootStyle title="Alta Cliente">
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
                      Alta Empleado
                    </Typography>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/dashboard/employee"
                      startIcon={<Icon icon="eva:arrow-back-fill" />}
                    >
                      Atrás
                    </Button>
                  </Stack>
                </Box>
                <NewEmployeeForm />
              </ContentStyle>
            </Container>
          </RootStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
