import PropTypes from 'prop-types'
import { Paper, Typography } from '@mui/material'

ObrasNotFound.propTypes = {
  searchQuery: PropTypes.string
}

export default function ObrasNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Todavía no se han agregado obras
      </Typography>
    </Paper>
  );
}
