import * as Yup from "yup";
import axios from "axios";
import { React, useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from "@mui/lab";

const tiposDeUnidad = [
  {
    value: "KG",
    label: "KG",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "LT",
    label: "LT",
  },
  {
    value: "CM",
    label: "CM",
  },
  {
    value: "TN",
    label: "TN",
  },
];

export default function NewProductForm() {
  const [tipoUnidad, setTipoUnida] = useState('KG');

  const changeTipo = (event) => {
    setTipoUnida(event.target.value);
  };

  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "Máximo de caracteres: 20")
      .required("Nombre es obligatorio"),
    price: Yup.number().required("Precio es obligatorio"),
    currentStock: Yup.number().required("Stock actual es obligatorio"),
    minStock: Yup.number().required("Stock mínimo es obligatorio")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      currentStock: "",
      minStock: "",
      unit: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log("en submit");
      axios
        .post("http://localhost:8765/dan-ms-productos/api/productos", {
          nombre: values.name,
          descripcion: values.description,
          precio: values.price,
          stockActual: values.currentStock,
          stockMinimo: values.minStock,
          unidad: {
            descripcion: tipoUnidad,
          },
        })
        .then((response) => {
          if (response.data !== null) {
            alert("Se creó el producto exitosamente.");
            navigate("/dashboard/products", { replace: true });
          } else {
            alert("Hubo un error al crear la obra.");
          }
        })
        .catch((error) => {
          alert(`Ha ocurrido un error.`);
          console.log(error);
        });
      console.log("values", values);
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps("name")}
            />
            <TextField
              id="tipo"
              select
              fullWidth
              label="Unidad"
              value={tipoUnidad}
              onChange={changeTipo}
            >
              {tiposDeUnidad.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descripción"
            {...getFieldProps("description")}
          />

          <TextField
            fullWidth
            label="Precio"
            {...getFieldProps("price")}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Stock Actual"
              {...getFieldProps("currentStock")}
            />

            <TextField
              fullWidth
              label="Stock Mínimo"
              {...getFieldProps("minStock")}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Crear producto
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
