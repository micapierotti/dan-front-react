import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
// material
import { Box, Card, Link, Typography, Stack, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import { Icon } from "@iconify/react";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";
import ColorPreview from "../../ColorPreview";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, name, cover, price, currentStock, minStock, description } =
    product;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="subtitle2" noWrap>
          {description}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2">actual: {currentStock}</Typography>
          <Typography variant="subtitle2">min: {minStock}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div justifyContent="left">
            <IconButton
              onClick={() => {
                axios
                  .delete(
                    `http://localhost:8765/dan-ms-productos/api/productos/${id}`
                  )
                  .then((response) => {
                    if (response.data !== null) {
                      alert("Se elimino el producto exitosamente.");
                      window.location.reload();
                    } else {
                      alert("Hubo un error al borrar el producto.");
                    }
                  })
                  .catch((error) => {
                    alert(`No se encontró al producto indicado.`);
                  });
              }}
            >
              <Icon icon={trash2Outline} width={24} height={24} />
            </IconButton>
          </div>

          <Typography variant="subtitle2">
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
