import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function NewProductForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().max(20, 'Máximo de caracteres: 20').required('Nombre es obligatorio'),
        price: Yup.number().required('Precio es obligatorio'),
        actualStock: Yup.number().required('Stock actual es obligatorio'),
        minStock: Yup.number().required('Stock mínimo es obligatorio')
      });

      const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          price: '',
          actualStock: '',
          minStock: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
          navigate('/dashboard', { replace: true });
        }
      });

      const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

      return (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nombre"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                label="Descripción"
                {...getFieldProps('description')}
                helperText={touched.name}
              />

              <TextField
                fullWidth
                label="Precio"
                {...getFieldProps('price')}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Stock Actual"
                  {...getFieldProps('actualStock')}
                  error={Boolean(touched.actualStock && errors.actualStock)}
                  helperText={touched.actualStock && errors.actualStock}
                />

                <TextField
                  fullWidth
                  label="Stock Mínimo"
                  {...getFieldProps('minStock')}
                  error={Boolean(touched.minStock && errors.minStock)}
                  helperText={touched.minStock && errors.minStock}
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
