import * as Yup from 'yup'
import * as React from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

const tiposDeObra = [
  {
    value: 'REFORMA',
    label: 'REFORMA'
  },
  {
    value: 'CASA',
    label: 'CASA'
  },
  {
    value: 'EDIFICIO',
    label: 'EDIFICIO'
  },
  {
    value: 'VIAL',
    label: 'VIAL'
  }
];

export default function NewObraForm() {
  const navigate = useNavigate()
  const [tipoObra, setTipoObra] = React.useState('REFORMA')

  const changeTipo = (event) => {
    setTipoObra(event.target.value);
  }

  const RegisterSchema = Yup.object().shape({
    clienteId: Yup.number().required('Obligatorio'),
    latitud: Yup.number().required('Obligatorio'),
    longitud: Yup.number().required('Obligatorio'),
    superficie: Yup.number().required('Obligatorio'),
    direccion: Yup.string()
      .min(10, 'La dirección debe contener por lo menos 10 caracteres')
      .required('Obligatorio')
  })

  const formik = useFormik({
    initialValues: {
      tipo: '',
      clienteId: '',
      direccion: '',
      latitud: '',
      longitud: '',
      superficie: '',
      descripcion: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      axios.post('http://localhost:9000/api/obra', {
        descripcion: values.descripcion,
        latitud: values.latitud,
        longitud: values.longitud,
        direccion: values.direccion,
        superficie: values.superficie,
        tipo: tipoObra,
        clienteId: values.clienteId
      }).then(response => {
        if (response.data !== null) {
          alert('Se creó la obra exitosamente.')
          navigate('/dashboard/obras', { replace: true })
        } else {
          alert('Hubo un error al crear la obra.')
        }
      }).catch(error => {
        alert(`No se encontró al cliente indicado.`)
      })
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id='tipo'
              select
              fullWidth
              label='Tipo de Obra'
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
              id='clienteId'
              label='Id cliente'
              type='number'
              {...getFieldProps('clienteId')}
              error={Boolean(touched.clienteId && errors.clienteId)}
              helperText={touched.clienteId && errors.clienteId}
            />
            <TextField
              fullWidth
              autoComplete='direccion'
              label='Dirección'
              {...getFieldProps('direccion')}
              error={Boolean(touched.direccion && errors.direccion)}
              helperText={touched.direccion && errors.direccion}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id='latitud'
              label='latitud'
              type='number'
              {...getFieldProps('latitud')}
              error={Boolean(touched.latitud && errors.latitud)}
              helperText={touched.latitud && errors.latitud}
            />
            <TextField
              id='longitud'
              label='longitud'
              type='number'
              {...getFieldProps('longitud')}
              error={Boolean(touched.longitud && errors.longitud)}
              helperText={touched.longitud && errors.longitud}
            />
            <TextField
              id='superficie'
              label='superficie'
              type='number'
              {...getFieldProps('superficie')}
              error={Boolean(touched.superficie && errors.superficie)}
              helperText={touched.superficie && errors.superficie}
            />
          </Stack>

          <TextField
            id='descripcion'
            label='Descripción'
            autoComplete='descripcion'
            multiline
            rows={4}
            {...getFieldProps('descripcion')}
          />

          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Crear
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
