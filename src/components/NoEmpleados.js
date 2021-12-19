import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

NoEmpleados.propTypes = {
  searchQuery: PropTypes.string
};

export default function NoEmpleados({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No se han encontrado empleados.
      </Typography>
    </Paper>
  );
}
