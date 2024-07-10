import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { LoginsSoobError } from "./LoginsSoobError";

import { styleBoxHeader, styleXTG02, styleXTG021 } from "./LoginsStyle";
import { styleXTG04, styleXTG03, styleXTG033, styleBoxGl } from "./LoginsStyle";
import { styleXTG044, styleBut01, styleBut02 } from "./LoginsStyle";
import { styleReset, styleServis, styleServisKnop } from "./LoginsStyle";
import { styleP02, styleBoxResStr, styleBoxFocus } from "./LoginsStyle";

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
let formSettOld = "";

let massPoints: Array<Line> = [];
let massPointsEtalon: Array<Line> = [];
let soob = "";
let nomIllum = 2;
let resStr: any = [];
let sbros = 0;

const Logins = (props: { logName: string; debug: boolean }) => {
  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [openSetErr, setOpenSetErr] = React.useState(false);
  //============ Инициализация ======================
  if (oldData !== props.logName) {
    oldData = props.logName;
    nomIllum = 2;
    formSett = "";
    formSettOld = "";
    sbros = 0;
    props.debug ? setIsOpen(true) : setIsOpen(false);
    props.debug && setIsRead(true);
    setOpenSetErr(false);
  }
  //=================================================
  const SetValue = (mode: number) => {
    nomIllum = mode;
    setValue(mode);
    setOpenLoader(true);
  };

  const ContentStrokaLogins = (xss: number, soob: any, style: any) => {
    return (
      <Grid item xs={xss} sx={style}>
        <b>{soob}</b>
      </Grid>
    );
  };

  const HeaderLogins = () => {
    let styleType = nomIllum === 1 ? styleBut01 : styleBut02;
    let styleTime = nomIllum === 2 ? styleBut01 : styleBut02;
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG021}>
          <Button sx={styleType} onClick={() => SetValue(1)}>
            <b>Тип</b>
          </Button>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <Button sx={styleTime} onClick={() => SetValue(2)}>
            <b>Время</b>
          </Button>
        </Grid>
        {ContentStrokaLogins(2, "Сообщение", styleXTG021)}
      </Grid>
    );
  };

  const StrokaLogins = () => {
    resStr = [];
    if (isOpen) {
      for (let i = 0; i < massPoints.length; i++) {
        let style4 = massPoints[i].haveError ? styleXTG044 : styleXTG04;
        let style3 = massPoints[i].haveError ? styleXTG033 : styleXTG03;
        resStr.push(
          <Grid key={i} container item>
            {ContentStrokaLogins(1.5, massPoints[i].type, style4)}
            {ContentStrokaLogins(1, massPoints[i].time, style3)}
            {ContentStrokaLogins(9.5, massPoints[i].info, style4)}
          </Grid>
        );
      }
    }
    return resStr;
  };

  const TabsLogins = (valueSort: number) => {
    if (isOpen) {
      //console.log("valueSort:",sbros, valueSort);
      switch (valueSort) {
        case 1: // сортировка по type
          sbros++;
          massPoints.sort((a, b) => a.num - b.num);
          break;
        case 2: // сортировка по time
          if (sbros) sbros++;
          massPoints.sort((a, b) => a.pnum - b.pnum);
          break;
        case 3: // поиск в сообщениях
          if (formSett) {
            sbros++;
            let masrab: Array<Line> = [];
            for (let i = 0; i < massPoints.length; i++) {
              let str = massPoints[i].info.toUpperCase();
              if (str.indexOf(formSett.toUpperCase()) !== -1) {
                masrab.push(massPoints[i]);
              }
            }
            if (masrab.length) {
              massPoints = [];
              massPoints = masrab;
            } else {
              soob = "По вашему запросу ничего не найдено";
              setOpenSetErr(true);
              formSett = "";
            }
          }
          break;
        case 4: // сброс
          sbros = 0;
          massPoints = massPointsEtalon;
          setValue(2);
          nomIllum = 2;
          formSett = "";
          formSettOld = "";
          break;
      }
      Output();
    }
  };

  const MakeMassPoints = () => {
    massPoints = [];
    let oldTime = "";

    for (let i = 0; i < points.length; i++) {
      let maskPoints = [
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
    if (!formSett) formSett = formSettOld;
    if (formSett) {
      sbros++;
      setValue(3);
      setOpenLoader(true);
    }
  };

  const InputPoisk = () => {
    const [valuen, setValuen] = React.useState(formSettOld);

    const handleKey = (event: any) => {
      if (event.key === "Enter") event.preventDefault();
    };

    const handleChange = (event: any) => {
      formSett = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen(event.target.value.trimStart());
      formSettOld = formSett;
    };

    return (
      <Box component="form">
        <TextField
          size="small"
          onKeyPress={handleKey} //отключение Enter
          InputProps={{ disableUnderline: true }}
          inputProps={{
            style: { cursor: "pointer", fontSize: 14 },
          }}
          value={valuen}
          onChange={handleChange}
          variant="standard"
        />
      </Box>
    );
  };

  const WindSearsh = () => {
    return (
      <Box sx={styleServis}>
        <Grid item container>
          <Grid item xs={9.5} sx={styleP02}>
            <InputPoisk />
          </Grid>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={2.4}>
            <Button sx={styleServisKnop} onClick={setFind}>
              <b>Поиск</b>
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleCloseSbros = () => {
    if (sbros) {
      setOpenLoader(true);
      setValue(4);
    }
  };

  const SetOpenSetErr = (mode: boolean) => {
    setOpenSetErr(mode);
  };

  const MainLogins = () => {
    return (
      <Box sx={styleBoxGl}>
        <Box sx={styleBoxHeader}>{HeaderLogins()}</Box>
        <Box sx={{ height: "92vh" }}>
          <Box sx={styleBoxResStr}>
            <Box sx={styleBoxFocus}>{resStr}</Box>
          </Box>
        </Box>
        {openSetErr && <>{LoginsSoobError(openSetErr, soob, SetOpenSetErr)} </>}
      </Box>
    );
  };
  //============ Динама =============================
  const [openLoader, setOpenLoader] = React.useState(false);
  const handleClose = () => {
    setOpenLoader(false);
  };

  const styleBackdrop = {
    color: "#fff",
    marginTop: "5vh",
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  };

  const Output = () => {
    //React.useEffect(() => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 100);
    ///}, []);
  };

  const Loader = () => {
    return (
      <Backdrop sx={styleBackdrop} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //============ Чтение страницы журнала ============
  let ipAdress: string =
    window.location.href + "/info?fileName=" + props.logName;
  if (props.debug) {
    ipAdress = window.location.href.includes("localhost")
      ? "http://localhost:3000/otlmess.json"
      : "./otlmess.json";
  }

  React.useEffect(() => {
    setOpenLoader(true);
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.logData);
      setIsRead(true);
      setIsOpen(true);
      setValue(2);
    });
  }, [ipAdress]);
  //=================================================
  if (isRead) {
    setOpenLoader(true);
    MakeMassPoints(); // создание матрицы страницы
    setIsRead(false);
  }

  TabsLogins(value);
  StrokaLogins();

  return (
    <>
      <Button sx={styleReset} onClick={handleCloseSbros}>
        <b>Сброс настроек</b>
      </Button>
      {WindSearsh()}
      {!openLoader && <>{MainLogins()} </>}
      {openLoader && <>{Loader()}</>}
    </>
  );
};

export default Logins;
