import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserMoreMenu } from '../components/_dashboard/user';
import ObrasNotFound from '../components/NoObras';

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'tipo', label: 'Tipo', alignRight: false },
  { id: 'direccion', label: 'Dirección', alignRight: false },
  { id: 'cliente', label: 'Cliente', alignRight: false },
  { id: 'superficie', label: 'Superficie', alignRight: false },
  { id: '' }
];

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

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Obras() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [OBRASLIST, setOBRASLIST] = useState([]);
  const [listaObras, setListaObras] = useState([]);
  const [listaObrasVacia, setListaObrasVacia] = useState(true);
  const [emptyRows, setEmptyRows] = useState(0);

  useEffect(() => {
      async function fetchData() {
        const response = await axios.get('http://localhost:8765/dan-ms-usuarios/api/obra');
        setOBRASLIST(response.data);
        console.log(response.data);
      }

      fetchData();
    }, []);

  useEffect(() => {
    setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OBRASLIST.length) : 0);
    setListaObras(applySortFilter(OBRASLIST, getComparator(order, orderBy)));
    setListaObrasVacia(listaObras.length === 0);
  }, [OBRASLIST, listaObras.length, order, orderBy, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = OBRASLIST.map((n) => n.name);
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

  return (
    <Page title="Obras">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Obras
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/obras/nuevaObra"
            startIcon={<Icon icon={plusFill} />}
          >
            Nueva obra
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={OBRASLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {listaObras
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, tipo, direccion, clienteId, superficie } = row;
                      const avatarUrl = `/static/mock-images/products/product_${Math.floor(Math.random() * 24) + 1}.jpg`;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={id} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{tipo}</TableCell>
                          <TableCell align="left">{direccion}</TableCell>
                          <TableCell align="left">{clienteId}</TableCell>
                          <TableCell align="left">{superficie}</TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {listaObrasVacia && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <ObrasNotFound />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={OBRASLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
