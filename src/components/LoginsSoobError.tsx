import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//import { styleModalEnd, styleSetInf } from "./components/MainMapStyle";
//const LoginsSoobError = (props: { open: boolean; sErr: string; setOpen: any }) => {
export const LoginsSoobError = (
  open: boolean,
  sErr: string,
  setOpen: Function
) => {
  //const [openSet, setOpenSet] = React.useState(props.open);

  //console.log("!!!!LoginsSoobError:", open);

  const styleModalEnd = {
    position: "absolute",
    top: "0%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "red",
  };

  const styleSetInf = {
    position: "absolute",
    marginTop: "21vh",
    marginLeft: "36vh",
    width: 340,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    //borderColor: "red",
    borderRadius: 1,
    boxShadow: 24,
    textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
    p: 1.5,
  };

  const handleCloseEnd = (mode: number) => {
    //console.log("handleCloseEnd", mode);
    setOpen(false);
    //setOpenSet(false);
  };

  const handleClose = (event: any, reason: string) => {
    console.log("handleClose");
    if (reason === "escapeKeyDown") handleCloseEnd(1);
  };

  return (
    <Modal open={open} onClose={handleClose} hideBackdrop={false}>
      <Box sx={styleSetInf}>
        <Button sx={styleModalEnd} onClick={() => handleCloseEnd(1)}>
          <b>&#10006;</b>
        </Button>
        <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>
          {sErr}
        </Typography>
      </Box>
    </Modal>
  );
};

//export default LoginsSoobError;
