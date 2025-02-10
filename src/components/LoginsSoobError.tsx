import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export const LoginsSoobError = (
  open: boolean,
  sErr: string,
  setOpen: Function
) => {
  const styleModalEnd = {
    position: "absolute",
    top: "0%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "black",
  };

  const styleSetInf = {
    position: "absolute",
    marginTop: "21vh",
    marginLeft: "36vh",
    width: 340,
    bgcolor: "#FFDB4D", // жёлтый
    border: "1px solid #FFEDA6",
    borderRadius: 1,
    color: "black",
    boxShadow: 24,
    textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
    p: 1.5,
  };

  const handleCloseEnd = (mode: number) => {
    setOpen(false);
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
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {sErr}
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginsSoobError;
