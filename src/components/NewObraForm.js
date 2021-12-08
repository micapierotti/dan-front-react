import * as Yup from 'yup'
import * as React from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const tiposDeObra = [
  {
    value: 'REFORMA',
    label: 'REFORMA',
  },
  {
    value: 'CASA',
    label: 'CASA',
  },
  {
    value: 'EDIFICIO',
    label: 'EDIFICIO',
  },
  {
    value: 'VIAL',
    label: 'VIAL',
  },
]

export default function NewObraForm() {
  const navigate = useNavigate()
  const [tipoObra, setTipoObra] = React.useState('REFORMA')

  const changeTipo = (event) => {
    setTipoObra(event.target.value);
  }

  const RegisterSchema = Yup.object().shape({
    id: Yup.number().required('Obligatorio'),
    idCliente: Yup.number().required('Obligatorio'),
    latitud: Yup.number().required('Obligatorio'),
    longitud: Yup.number().required('Obligatorio'),
    superficie: Yup.number().required('Obligatorio'),
    direccion: Yup.string()
      .min(10, 'La dirección debe contener por lo menos 10 caracteres')
      .required('Obligatorio')
  })

  const formik = useFormik({
    initialValues: {
      id: '',
      tipo: '',
      idCliente: '',
      direccion: '',
      latitud: '',
      longitud: '',
      superficie: '',
      descripcion: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard/obras', { replace: true });
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    // id (int), descripcion(s), latitud(float), longitud(float), direccion(s), superficie(int), tipo(s), clienteId(int)

    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
        <Stack spacing={3} >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="id"
              label="Id"
              type="number"
              {...getFieldProps('id')}
              error={Boolean(touched.id && errors.id)}
              helperText={touched.id && errors.id}
            />
            <TextField
              id="tipo"
              select
              fullWidth
              label="Tipo de Obra"
              value={tipoObra}
              onChange={changeTipo}
            >
              {tiposDeObra.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="idCliente"
              label="Id cliente"
              type="number"
              {...getFieldProps('idCliente')}
              error={Boolean(touched.idCliente && errors.idCliente)}
              helperText={touched.idCliente && errors.idCliente}
            />
          <TextField
            fullWidth
            autoComplete="direccion"
            label="Dirección"
            {...getFieldProps('direccion')}
            error={Boolean(touched.direccion && errors.direccion)}
            helperText={touched.direccion && errors.direccion}
          />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="latitud"
              label="latitud"
              type="number"
              {...getFieldProps('latitud')}
              error={Boolean(touched.latitud && errors.latitud)}
              helperText={touched.latitud && errors.latitud}
            />
            <TextField
              id="longitud"
              label="longitud"
              type="number"
              {...getFieldProps('longitud')}
              error={Boolean(touched.longitud && errors.longitud)}
              helperText={touched.longitud && errors.longitud}
            />
            <TextField
              id="superficie"
              label="superficie"
              type="number"
              {...getFieldProps('superficie')}
              error={Boolean(touched.superficie && errors.superficie)}
              helperText={touched.superficie && errors.superficie}
            />
          </Stack>

          <TextField
            id="descripcion"
            label="Descripción"
            autoComplete="descripcion"
            multiline
            rows={4}
            {...getFieldProps('descripcion')}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Crear
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
