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
let nomIllum = -1;
let HideBackdrop = true;

const App = () => {
  const styleApp01 = {
    fontSize: 14,
    marginRight: 0.5,
    width: "140px",
    maxHeight: "21px",
    minHeight: "21px",
    backgroundColor: "#E9F5D8", // светло салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    boxShadow: 1,
  };

  const styleApp02 = {
    fontSize: 12.9,
    marginRight: 0.5,
    width: "140px",
    maxHeight: "18px",
    minHeight: "18px",
    backgroundColor: "#FFE295",
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    textAlign: "center",
    boxShadow: 3,
  };

  const styleModalMenu01 = {
    fontSize: 13.9,
    maxHeight: "20px",
    minHeight: "20px",
    bgcolor: "#BAE186", // тёмно-салатовый
    border: "1px solid #000",
    borderColor: "#93D145", // ярко-салатовый
    borderRadius: 1,
    color: "black",
    //marginRight: 1.5,
    marginBottom: 0.3,
    textTransform: "unset !important",
    boxShadow: 12,
  };

  const styleModalMenu02 = {
    fontSize: 13.9,
    maxHeight: "20px",
    minHeight: "20px",
    backgroundColor: "#E9F5D8", // светло салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    //marginRight: 1,
    marginBottom: 0.3,
    textTransform: "unset !important",
    boxShadow: 1,
  };

  const styleModal = {
    outline: "none",
    position: "relative",
    marginLeft: "16vh",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 121,
    bgcolor: "#eef4f9",
    border: "1px solid #000",
    borderColor: "primary.main",
    borderRadius: 1,
    boxShadow: 24,
    p: 3,
  };

  const styleModalEnd = {
    position: "absolute",
    top: "-0.2%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "black",
    fontSize: 14,
  };

  const [open, setOpen] = React.useState(false);
  const [crossData, setCrossData] = React.useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = (numer: number) => {
    nomIllum = numer;
    HideBackdrop = false;
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
        let I = points.length - i - 1;
        stroka = points[I];
        strDat =
          stroka.slice(11, 13) +
          "." +
          stroka.slice(8, 10) +
          "." +
          stroka.slice(3, 7);
        let illum = nomIllum === I ? styleModalMenu01 : styleModalMenu02;
        resStr.push(
          <Button key={i} sx={illum} onClick={() => handleClose(I)}>
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
        <Button sx={styleApp01} onClick={handleOpen}>
          <b>Выбор по дате</b>
        </Button>
        <Modal open={open} hideBackdrop={HideBackdrop}>
          <Box sx={styleModal}>
            <Box sx={{ overflowX: "auto", height: "88vh" }}>{SpisData()}</Box>
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
      console.log("РЕЖИМ ОТЛАДКИ!!!");
      setIpAdress("http://localhost:3000/otladkaGlob.json");
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
      <Grid container sx={{ border: 0, marginTop: 0 }}>
        <Grid item xs={12}>
          <TabContext value={value}>
            <Stack direction="row">
              <ChoiceData />
              <Box sx={styleApp02}>
                <em>Журнал за {extData}</em>
              </Box>
            </Stack>
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
