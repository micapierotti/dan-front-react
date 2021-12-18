import * as Yup from 'yup';
import { useState } from 'react';
import axios from "axios";
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function NewClientForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().min(2, 'Es muy corto').max(20, 'Máximo de caracteres: 20').required('Usuario es obligatorio'),
        email: Yup.string().email('Email debe ser una dirección de email válida').required('Email es obligatorio'),
        password: Yup.string().required('Contraseña es obligatorio')
      });

      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          email: '',
          cuit: '',
          razonSocial: '',
          maxCuentaCorriente: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
          axios.post('http://localhost:8765/dan-ms-usuarios/api/cliente', {
            razonSocial: values.razonSocial,
            cuit: values.cuit,
            mail: values.email,
            maxCuentaCorriente: values.maxCuentaCorriente,
            username: values.username,
            password: values.password,
          }).then((response) => {
            if (response.data !== null) {
              alert('Se creó el cliente exitosamente.');
              navigate('/dashboard/client', { replace: true });
            } else {
              alert('Hubo un error al crear el cliente.');
            }
          }).catch((error) => {
            alert(`Ha ocurrido un error.`);
          });
        }
      });

      const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

      return (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Usuario"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  {...getFieldProps('password')}
                  InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>

              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                label="CUIT"
                {...getFieldProps('cuit')}
                helperText={touched.username}
              />

              <TextField
                fullWidth
                label="Razón Social"
                {...getFieldProps('razonSocial')}
                helperText={touched.username}
              />

              <TextField
                fullWidth
                label="Máximo en cuenta corriente"
                {...getFieldProps('maxCuentaCorriente')}
                helperText={touched.username}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Crear cliente
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      );
}
