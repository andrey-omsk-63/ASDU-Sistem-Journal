import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import LoginsSoobError from "./LoginsSoobError";

import { styleBoxHeader, styleXTG02, styleXTG021 } from "./LoginsStyle";
import { styleXTG04, styleXTG03, styleXTG033, styleBoxGl } from "./LoginsStyle";
import { styleXTG044, styleBut01 } from "./LoginsStyle";
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
let massPointsEtalon: Array<Line> = [];
let soob = "";
let openSetErr = false;

const Logins = (props: { logName: string; debug: boolean }) => {
  if (oldData !== props.logName) oldData = props.logName;

  const SetValue = (mode: number) => {
    setValue(mode);
    setOpenLoader(true);
  };

  const setOpenSetErr = (mode: boolean) => {
    openSetErr = mode;
  };

  let resStr: any = [];
  const HeaderLogins = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG021}>
          <Button
            sx={styleBut01}
            variant="contained"
            onClick={() => SetValue(1)}
          >
            <b>Тип</b>
          </Button>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <Button
            sx={styleBut01}
            variant="contained"
            onClick={() => SetValue(2)}
          >
            <b>Время</b>
          </Button>
        </Grid>
        <Grid item xs={2} sx={styleXTG021}>
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
          //  <Grid key={Math.random()} tabIndex={1} container item>
          <Grid key={Math.random()} container item>
            <Grid
              item
              xs={1.5}
              sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}
            >
              <b>{massPoints[i].type}</b>
            </Grid>
            <Grid
              item
              xs={1}
              sx={massPoints[i].haveError ? styleXTG033 : styleXTG03}
            >
              <b>{massPoints[i].time}</b>
            </Grid>
            <Grid
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
          Output();
          break;
        case 2: // сортировка по time
          massPoints.sort((a, b) => a.pnum - b.pnum);
          Output();
          break;
        case 3: // поиск в сообщениях
          console.log("formSett:", formSett);
          if (formSett) {
            let masrab: Array<Line> = [];
            for (let i = 0; i < massPoints.length; i++) {
              let str = massPoints[i].info.toUpperCase();
              if (str.indexOf(formSett.toUpperCase()) !== -1) {
                masrab.push(massPoints[i]);
              }
            }
            Output();
            if (masrab.length) {
              massPoints = [];
              massPoints = masrab;
            } else {
              soob = "По вашему запросу ничего не найдено";
              setOpenSetErr(true);
            }
          }
          //Output();
          break;
        case 4: // сброс
          massPoints = massPointsEtalon;
          setValue(2);
          formSett = "";
          Output();
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
    massPointsEtalon = massPoints;
    Output();
  };

  const setFind = () => {
    if (formSett) {
      setValue(3);
      setOpenLoader(true);
    }
  };

  const styleP02 = {
    border: 0,
    backgroundColor: "#FFFBE5",
    marginTop: -2.75,
    maxHeight: "21px",
    minHeight: "21px",
    maxWidth: "75px",
    minWidth: "75px",
  };

  const InputPoisk = () => {
    const [valuen, setValuen] = React.useState(formSett);

    const handleKey = (event: any) => {
      if (event.key === "Enter") event.preventDefault();
    };

    const handleChange = (event: any) => {
      formSett = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen(formSett);
    };

    return (
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "280px" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          size="small"
          onKeyPress={handleKey} //отключение Enter
          InputProps={{ disableUnderline: true, style: { fontSize: 14 } }}
          value={valuen}
          onChange={handleChange}
          variant="standard"
        />
      </Box>
    );
  };

  const WindSearsh = () => {
    return (
      <>
        <Box sx={styleServis}>
          <Grid item container>
            <Grid item xs={9.5} sx={styleP02}>
              <InputPoisk />
            </Grid>
            <Grid item xs={0.1}></Grid>
            <Grid item xs={2.4}>
              <Button
                sx={styleServisKnop}
                variant="contained"
                onClick={setFind}
              >
                <b>Поиск</b>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [value, setValue] = React.useState(2);
  //const [openSetErr, setOpenSetErr] = React.useState(false);

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

  const handleCloseSbros = () => {
    setOpenLoader(true);
    setValue(4);
  };
  //============ Динама =====================================================
  const [openLoader, setOpenLoader] = React.useState(false);
  const handleClose = () => {
    setOpenLoader(false);
  };

  const styleBackdrop = {
    color: "#fff",
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  };

  const Output = () => {
    //React.useEffect(() => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 100);
    //}, []);
  };

  const Loader = () => {
    return (
      <Backdrop sx={styleBackdrop} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={548} />
      </Backdrop>
    );
  };
  //=========================================================================
  const MainLogins = () => {
    return (
      <Box sx={styleBoxGl}>
        <Box sx={styleBoxHeader}>
          <HeaderLogins />
        </Box>

        <Box sx={{ height: "92vh", border: 0 }}>
          <Box
            sx={{
              //": focus": {
              //bgcolor: "#D4E6F3",
              bgcolor: "#EDF4FA",
              overflowX: "auto",
              height: "94.5vh",
              //},
            }}
          >
            <Box
              sx={{
                ": focus": {
                  overflowX: "auto",
                  height: "94.5vh",
                },
              }}
            >
              {/* <div tabIndex={1}>{resStr}</div> */}
              {resStr}
            </Box>
          </Box>
        </Box>

        {openSetErr && <LoginsSoobError sErr={soob} setOpen={setOpenSetErr} />}
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
    <>
      <Button sx={styleReset} variant="contained" onClick={handleCloseSbros}>
        <b>Сброс настроек</b>
      </Button>
      <WindSearsh />
      {!openLoader && <MainLogins />}
      {openLoader && <Loader />}
    </>
  );
};

export default Logins;
