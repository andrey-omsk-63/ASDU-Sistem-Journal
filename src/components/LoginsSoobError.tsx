import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//import { styleModalEnd, styleSetInf } from "./components/MainMapStyle";

const LoginsSoobError = (props: { sErr: string; setOpen: any }) => {
  const [openSet, setOpenSet] = React.useState(true);
 
  const styleModalEnd = {
    position: 'absolute',
    top: '0%',
    left: 'auto',
    right: '-0%',
    height: '21px',
    maxWidth: '2%',
    minWidth: '2%',
    color: 'black',
  };
  
  const styleSetInf = {
    position: 'absolute',
    marginTop: '21vh',
    marginLeft: '36vh',
    width: 340,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderColor: 'primary.main',
    borderRadius: 2,
    boxShadow: 24,
    p: 1.5,
  };

  const handleClose = () => {
    props.setOpen(false);
    setOpenSet(false);
  };

  return (
    <Modal open={openSet} onClose={handleClose} hideBackdrop>
      <Box sx={styleSetInf}>
        <Button sx={styleModalEnd} onClick={handleClose}>
          <b>&#10006;</b>
        </Button>
        <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>
          {props.sErr}
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginsSoobError;
