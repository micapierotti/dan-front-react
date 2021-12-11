import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import NewProductForm from '../forms/NewProductForm';
//
import USERLIST from '../_mocks_/user';

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
  return order === 'desc'
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function NewProduct() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('username');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  return (
    <Page title="Alta de Producto">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Alta de Producto
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/products"
            startIcon={<Icon icon="eva:arrow-back-fill" />}
          >
            Atrás
          </Button>
        </Stack>
        <NewProductForm />

      </Container>
    </Page>
  );
}
