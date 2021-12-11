import { Icon } from "@iconify/react";
import axios from "axios";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ idCliente }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => {
            axios
              .delete(
                `http://localhost:9000/api/cliente/delete-by-id/${idCliente}`
              )
              .then((response) => {
                if (response.data !== null) {
                  alert("Se elimino el cliente exitosamente.");
                  window.location.reload();
                } else {
                  alert("Hubo un error al borrar el cliente.");
                }
              })
              .catch((error) => {
                alert(`No se encontró al cliente indicado.`);
              });
          }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Eliminar"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Editar"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
