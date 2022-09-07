import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";

import axios from "axios";

import Logins from "./components/Logins";

let extData = "__.__.____";

let debug = false;
let openSeans = false;

const App = () => {
  const styleApp01 = {
    fontSize: 14,
    marginRight: 0.5,
    maxWidth: "140px",
    minWidth: "140px",
    maxHeight: "21px",
    minHeight: "21px",
    backgroundColor: "#F1F3F4",
    color: "black",
    textTransform: "unset !important",
  };

  const styleApp02 = {
    fontSize: 14,
    marginRight: 0.5,
    borderRadius: 1,
    //width: "12%",
    maxWidth: "140px",
    minWidth: "140px",
    maxHeight: "21px",
    minHeight: "21px",
    backgroundColor: "#FFE295",
    color: "black",
    textAlign: "center",
  };

  const styleModalMenu = {
    fontSize: 13.9,
    maxHeight: "20px",
    minHeight: "20px",
    backgroundColor: "#F1F3F4",
    color: "black",
    marginRight: 1,
    marginBottom: 0.2,
    textTransform: "unset !important",
  };

  const styleModal = {
    position: "relative",
    bottom: "-50vh",
    marginLeft: "60vh",
    transform: "translate(-50%, -50%)",
    width: 150,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderColor: "primary.main",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  const styleModalEnd = {
    position: "absolute",
    maxWidth: "3vh",
    minWidth: "3vh",
    maxHeight: "16px",
    minHeight: "16px",
    backgroundColor: "fff",
    color: "black",
    top: "0.5%",
    left: "88%",
    fontSize: 15,
  };

  const [open, setOpen] = React.useState(false);
  const [crossData, setCrossData] = React.useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = (numer: number) => {
    if (numer !== 777) {
      setCrossData(numer);
      setValue("1");
      extData =
        points[numer].slice(11, 13) +
        "." +
        points[numer].slice(8, 10) +
        "." +
        points[numer].slice(3, 7);
    }
    setOpen(false);
  };

  const SpisData = () => {
    let resStr = [];
    let stroka = "";
    let strDat = "";

    resStr.push(
      <Button key={777} sx={styleModalEnd} onClick={() => handleClose(777)}>
        <b>&#10006;</b>
      </Button>
    );
    if (isOpen) {
      for (let i = 0; i < points.length; i++) {
        stroka = points[points.length - i - 1];
        strDat =
          stroka.slice(11, 13) +
          "." +
          stroka.slice(8, 10) +
          "." +
          stroka.slice(3, 7);
        resStr.push(
          <Button
            key={i}
            sx={styleModalMenu}
            variant="contained"
            onClick={() => handleClose(points.length - i - 1)}
          >
            <b>{strDat}</b>
          </Button>
        );
      }
    }

    return resStr;
  };

  const ChoiceData = () => {
    return (
      <>
        <Button sx={styleApp01} variant="contained" onClick={handleOpen}>
          <b>Выбор по дате</b>
        </Button>
        <Modal open={open}>
          <Box sx={styleModal}>
            <Stack direction="column">{SpisData()}</Stack>
          </Box>
        </Modal>
      </>
    );
  };

  const [points, setPoints] = React.useState<Array<string>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [ipAdress, setIpAdress] = React.useState(window.location.href);
  
  if (!openSeans) {
    let pageUrl = new URL(window.location.href);
    if (pageUrl.href === "http://localhost:3000/") {
      console.log('РЕЖИМ ОТЛАДКИ!!!')
      setIpAdress("http://localhost:3000/otladkaGlob.json")
      debug = true;
    }
    openSeans = true;
  }

  React.useEffect(() => {
    if (debug) {
      axios.get(ipAdress).then(({ data }) => {
        console.log("data:", data);
        setPoints(data.fileNames);
      });
    } else {
      axios.post(ipAdress).then(({ data }) => {
        console.log("data:", data);
        setPoints(data.fileNames);
      });
    }
    setIsOpen(true);
  }, [ipAdress]);

  const [value, setValue] = React.useState("0");

  return (
    <>
      <Grid container sx={{ border: 0, marginTop: 0.5 }}>
        <Grid item xs={12}>
          <TabContext value={value}>
            <Stack direction="row">
              <ChoiceData />
              <Box sx={styleApp02}>{extData}</Box>
            </Stack>
            {/* </Box> */}
            <TabPanel value="1">
              <Logins logName={points[crossData]} debug={debug} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
