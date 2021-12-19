import axios from "axios";
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// components
import Page from '../components/Page';
import {
  ProductList
} from '../components/_dashboard/products';
// utils
import { mockImgProduct } from '../utils/mockImages';
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------
const PRODUCTS_REST_URL = "http://localhost:8765/dan-ms-productos/api/productos";

export default function Products() {
  const [openFilter, setOpenFilter] = useState(false);
  const [productos, setProductos] = useState([]);
  const [listaVacia, setListaVacia] = useState(true);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(PRODUCTS_REST_URL);
      setProductos(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setListaVacia(productos.length === 0);
  }, [productos]);

  if (!productos) return null;

  console.log(productos);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Productos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Productos
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/products/new"
            startIcon={<Icon icon={plusFill} />}
          >
            Nuevo producto
          </Button>
        </Stack>
        <ProductList products={
          productos.map((p, index) => {
            const setIndex = Math.floor(Math.random() * (5 - 1)) + 1;
            return {
              id: p.id,
              cover: mockImgProduct(setIndex),
              name: p.nombre,
              price: p.precio,
              currentStock: p.stockActual,
              minStock: p.stockMinimo,
              description: p.descripcion
            };
          })
        }
        />
        {listaVacia && (
          <Typography gutterBottom align="center" variant="subtitle1">
            Todavía no se han agregado productos
          </Typography>
        )}
      </Container>
    </Page>
  );
}
