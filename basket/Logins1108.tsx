import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { styleXt04, styleXTG02, styleXTG021, styleSet } from "./LoginsStyle";
import { styleXTG04, styleXTG03, styleXTG033, styleBoxGl } from "./LoginsStyle";
import { styleXTG044, styleInpKnop, styleBut01 } from "./LoginsStyle";
import { styleReset, styleServis, styleServisKnop } from "./LoginsStyle";

export interface LogMessage {
  logData: LogDatum[];
  message: string;
}

export interface LogDatum {
  message: string;
}

export interface DataMess {
  mess: Line[];
}

export interface Line {
  num: number;
  pnum: number;
  type: string;
  time: string;
  info: string;
  haveError: boolean;
}

let oldData = "-1";
let formSett = "";

let massPoints: Array<Line> = [];

const Logins = (props: { logName: string; debug: boolean }) => {
  if (oldData !== props.logName) oldData = props.logName;

  let resStr: any = [];
  const HeaderLogins = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG021}>
          <Button
            sx={styleBut01}
            variant="contained"
            onClick={() => setValue(1)}
          >
            <b>Тип</b>
          </Button>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <Button
            sx={styleBut01}
            variant="contained"
            onClick={() => setValue(2)}
          >
            <b>Время</b>
          </Button>
        </Grid>
        <Grid item xs={9.5} sx={styleXTG021}>
          <b>Сообщение</b>
        </Grid>
      </Grid>
    );
  };

  const StrokaLogins = () => {
    resStr = [];
    if (isOpen) {
      for (let i = 0; i < massPoints.length; i++) {
        resStr.push(
          <Grid key={Math.random()} item container xs={12}>
            <Grid
              key={Math.random()}
              item
              xs={1.5}
              sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}
            >
              <b>{massPoints[i].type}</b>
            </Grid>
            <Grid
              key={Math.random()}
              item
              xs={1}
              sx={massPoints[i].haveError ? styleXTG033 : styleXTG03}
            >
              <b>{massPoints[i].time}</b>
            </Grid>
            <Grid
              key={Math.random()}
              item
              xs={9.5}
              sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}
            >
              <b>{massPoints[i].info}</b>
            </Grid>
          </Grid>
        );
      }
    }
    return resStr;
  };

  const TabsLogins = (valueSort: number) => {
    if (isOpen) {
      switch (valueSort) {
        case 1: // сортировка по type
          massPoints.sort((a, b) => a.num - b.num);
          break;
        case 2: // сортировка по time
          massPoints.sort((a, b) => a.pnum - b.pnum);
          break;
        case 3: // поиск в сообщениях
          if (formSett) {
            let masrab: Array<Line> = [];
            for (let i = 0; i < massPoints.length; i++) {
              let str = massPoints[i].info.toUpperCase();
              if (str.indexOf(formSett.toUpperCase()) !== -1) {
                masrab.push(massPoints[i]);
              }
            }
            massPoints = [];
            massPoints = masrab;
            Output();
          }
          break;
        case 4: // сброс
          MakeMassPoints();
          setValue(2);
          formSett = "";
          break;
      }
    }
  };

  const MakeMassPoints = () => {
    massPoints = [];
    let oldTime = "";

    for (let i = 0; i < points.length; i++) {
      maskPoints = [
        {
          num: 0,
          pnum: i,
          type: "",
          time: "",
          info: "",
          haveError: false,
        },
      ];
      switch (points[i].message.slice(0, 1)) {
        case "I":
          maskPoints[0].type = "Информация";
          maskPoints[0].haveError = false;
          maskPoints[0].num = 0;
          break;
        case "D":
          maskPoints[0].type = "Отладка";
          maskPoints[0].haveError = false;
          maskPoints[0].num = 1;
          break;
        case "E":
          maskPoints[0].type = "Ошибка";
          maskPoints[0].haveError = true;
          maskPoints[0].num = 2;
          break;
        default:
          maskPoints[0].type = "Разное";
          maskPoints[0].haveError = true;
          maskPoints[0].num = 3;
      }
      if (maskPoints[0].num !== 3) {
        maskPoints[0].time = points[i].message.slice(20, 28);
        oldTime = maskPoints[0].time;
        maskPoints[0].info = points[i].message.slice(29);
      } else {
        maskPoints[0].time = oldTime;
        maskPoints[0].info = points[i].message;
      }
      massPoints.push(maskPoints[0]);
      setIsRead(false);
    }
    Output();
  };

  const WindSearsh = () => {
    return (
      <>
        <Box sx={styleServis}>
          <Button
            sx={styleServisKnop}
            variant="contained"
            onClick={handleOpenSet}
          >
            <b>Поиск</b>
          </Button>
        </Box>
        <Modal open={openSet} disableEnforceFocus onClose={handleCloseSet}>
          <Box sx={styleSet}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
              noValidate
              autoComplete="off"
            >
              <InpForm />
            </Box>
            <Button sx={styleInpKnop} variant="contained" onClick={setFind}>
              <b>Найти</b>
            </Button>
          </Box>
        </Modal>
      </>
    );
  };

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [value, setValue] = React.useState(2);

  let maskPoints: Array<Line> = [
    {
      num: 0,
      pnum: 0,
      type: "",
      time: "",
      info: "",
      haveError: false,
    },
  ];

  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => {
    // setOpenLoader(false);
    setOpenSet(true);
  };

  const handleCloseSet = (event: any, reason: string) => {
    if (reason !== "backdropClick") setOpenSet(false);
  };

  const setFind = () => {
    setOpenSet(false);
    setValue(3);
    if (formSett) setOpenLoader(true);
  };

  const InpForm = () => {
    const [valuen, setValuen] = React.useState(formSett);

    const handleChange = (event: any) => {
      formSett = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen(formSett);
    };

    const handleKey = (event: any) => {
      if (event.key === "Enter") event.preventDefault();
    };

    return (
      <TextField
        size="small"
        onKeyPress={handleKey}
        label="Поиск"
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        value={valuen}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  const [openLoader, setOpenLoader] = React.useState(false);
  const handleClose = () => {
    setOpenLoader(false);
  };

  const handleCloseSbros = () => {
    setOpenLoader(true);
    setValue(4);
  };

  const styleBackdrop = {
    color: "#fff",
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  };

  const Output = () => {
    // React.useEffect(() => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 100);
    // }, []);
  };

  const Loader = () => {
    console.log("Loader");
    return (
      <Backdrop sx={styleBackdrop} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };

  const MainLogins = () => {
    return (
      <Box sx={styleBoxGl}>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ marginRight: -1.5 }}>
              <Grid container>
                <Grid item xs={12} sx={styleXt04}>
                  <Box sx={{ borderRadius: 1, backgroundColor: "#C0C0C0" }}>
                    <HeaderLogins />
                  </Box>
                  <Box sx={{ overflowX: "auto", height: "92vh" }}>
                    {openLoader ? (
                      <Loader />
                    ) : (
                      <Grid container item>
                        {resStr}
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  let ipAdress: string =
    window.location.href + "/info?fileName=" + props.logName;
  if (props.debug) ipAdress = "http://localhost:3000/otlmess.json";

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.logData);
      setIsRead(true);
    });
    setIsOpen(true);
    setValue(2);
  }, [ipAdress]);

  if (isOpen && isRead) {
    setOpenLoader(true);
    MakeMassPoints();
  }

  TabsLogins(value);
  StrokaLogins();

  return (
    <Box>
      <Button sx={styleReset} variant="contained" onClick={handleCloseSbros}>
        <b>Сброс настроек</b>
      </Button>
      <WindSearsh />
      {/* {!openSet && <MainLogins />} */}
      <MainLogins />
    </Box>
  );
};

export default Logins;
