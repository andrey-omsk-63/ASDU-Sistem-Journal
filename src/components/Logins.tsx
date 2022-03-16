import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';

//import PointsMenuLevel1 from './PointsMenuLevel1';

import axios from 'axios';
//import { InputAdornment } from '@mui/material';

//import { XctrlInfo } from '../../interfaceGl.d';

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

let flagSbros = true;

let oldData = '-1';
let formSett = '';

let massPoints: Array<Line> = [];

const Logins = (props: { logName: string }) => {
  console.log('logName:', props.logName);

  if (oldData !== props.logName) {
    oldData = props.logName;
    flagSbros = true;
  }

  const styleXt04 = {
    border: 1,
    borderRadius: 2,
    borderColor: 'primary.main',
    backgroundColor: '#F1F5FB',
    opacity: 0.8,
    height: '93vh',
  };

  const styleXTG02 = {
    borderBottom: 1,
    borderColor: 'primary.main',
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG021 = {
    borderRadius: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
    color: 'black',
  };

  const styleXTG033 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
    color: 'red',
  };

  const styleXTG04 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    color: 'black',
  };

  const styleXTG044 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    color: 'red',
  };

  const styleServisKnop = {
    marginTop: -5.8,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    textTransform: 'unset !important',
  };

  const styleInpKnop = {
    color: 'black',
    marginTop: 1,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    textTransform: 'unset !important',
  };

  const styleBut01 = {
    fontSize: 12,
    marginRight: 0.5,
    width: '18%',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleSet = {
    position: 'absolute',
    top: '14%',
    right: '-9%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    borderColor: 'primary.main',
    border: '3px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    textAlign: 'center',
    p: 3,
  };

  const styleReset = {
    fontSize: 14,
    marginTop: -12,
    marginLeft: 72,
    width: '18%',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleServis = {
    fontSize: 14,
    marginTop: -5.5,
    marginLeft: 'auto',
    marginRight: 0,
    maxHeight: '21px',
    minHeight: '21px',
    width: '4%',
  };

  const HeaderLogins = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG021}>
          <Button sx={styleBut01} variant="contained" onClick={() => setValue(1)}>
            <b>Тип</b>
          </Button>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <Button sx={styleBut01} variant="contained" onClick={() => setValue(2)}>
            <b>Время</b>
          </Button>
        </Grid>
        <Grid item xs={9.5} sx={styleXTG021}>
          <b>Сообщение</b>
        </Grid>
      </Grid>
    );
  };

  const TabsLogins = (props: { valueSort: number }) => {
    if (flagSbros) {
      MakeMassPoints();
      flagSbros = false;
    } else {
      switch (props.valueSort) {
        case 1:
          // сортировка по type
          massPoints.sort((a, b) => a.num - b.num);
          break;
        case 2:
          // сортировка по time
          massPoints.sort((a, b) => a.pnum - b.pnum);
          break;
        case 3:
          // поиск в сообщениях
          let masrab: Array<Line> = [];

          for (let i = 0; i < massPoints.length; i++) {
            let str = massPoints[i].info.toUpperCase();
            if (str.indexOf(formSett.toUpperCase()) !== -1) {
              masrab.push(massPoints[i]);
            }
          }
          massPoints = [];
          massPoints = masrab;
          break;
        default:
          // сброс
          MakeMassPoints();
          formSett = '';
      }
    }

    const StrokaLogins = () => {
      let resStr = [];

      for (let i = 0; i < massPoints.length; i++) {
        resStr.push(
          <Grid key={Math.random()} item container xs={12}>
            <Grid
              key={Math.random()}
              item
              xs={1.5}
              sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}>
              <b>{massPoints[i].type}</b>
            </Grid>
            <Grid
              key={Math.random()}
              item
              xs={1}
              sx={massPoints[i].haveError ? styleXTG033 : styleXTG03}>
              <b>{massPoints[i].time}</b>
            </Grid>
            <Grid
              key={Math.random()}
              item
              xs={9.5}
              sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}>
              <b>{massPoints[i].info}</b>
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    return <Box sx={{ overflowX: 'auto', height: '88vh' }}>{StrokaLogins()}</Box>;
  };

  const MakeMassPoints = () => {
    massPoints = [];
    for (let i = 0; i < points.length; i++) {
      maskPoints = [
        {
          num: 0,
          pnum: i,
          type: '',
          time: '',
          info: '',
          haveError: false,
        },
      ];
      switch (points[i].message.slice(0, 1)) {
        case 'I':
          maskPoints[0].type = 'Информация';
          maskPoints[0].haveError = false;
          maskPoints[0].num = 0;
          break;
        case 'D':
          maskPoints[0].type = 'Отладка';
          maskPoints[0].haveError = false;
          maskPoints[0].num = 1;
          break;
        case 'E':
          maskPoints[0].type = 'Ошибка';
          maskPoints[0].haveError = true;
          maskPoints[0].num = 2;
          break;
        default:
          maskPoints[0].type = points[i].message.slice(0, 6);
          maskPoints[0].haveError = true;
          maskPoints[0].num = 3;
      }
      maskPoints[0].time = points[i].message.slice(20, 28);
      maskPoints[0].info = points[i].message.slice(29);

      massPoints.push(maskPoints[0]);
      setIsRead(false);
      //flagMake = false;
    }
  };

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [value, setValue] = React.useState(2);

  let maskPoints: Array<Line> = [
    {
      num: 0,
      pnum: 0,
      type: '',
      time: '',
      info: '',
      haveError: false,
    },
  ];

  //const ipAdress: string = 'http://localhost:3000/otlmess.json';
  const ipAdress: string = window.location.href + '/info?fileName=' + props.logName;

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      console.log('data:', data);
      setPoints(data.logData);
      setIsOpen(true);
      setIsRead(true);
    });
  }, [ipAdress]);

  //console.log('points:', points);

  if (isOpen && isRead) MakeMassPoints();

  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => setOpenSet(true);

  const handleCloseSet = (event: any, reason: string) => {
    if (reason !== 'backdropClick') setOpenSet(false);
  };

  const setFind = () => {
    setOpenSet(false);
    setValue(3);
  };

  const InpForm = () => {
    const [valuen, setValuen] = React.useState(formSett);

    const handleChange = (event: any) => {
      setValuen(event.target.value);
      formSett = event.target.value;
    };

    const handleKey = (event: any) => {
      if (event.key === 'Enter') event.preventDefault();
    };

    return (
      <TextField
        size="small"
        onKeyPress={handleKey}
        label="Поиск"
        value={valuen}
        onChange={handleChange} //отключение Enter
        variant="outlined"
      />
    );
  };

  return (
    <Box>
      <Button sx={styleReset} variant="contained" onClick={() => setValue(4)}>
        <b>Сброс настроек</b>
      </Button>
      <Box sx={styleServis}>
        <Button sx={styleServisKnop} onClick={handleOpenSet}>
          <b>Поиск</b>
        </Button>
        <Modal
          open={openSet}
          disableEnforceFocus
          onClose={handleCloseSet}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleSet}>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off">
              <InpForm />
            </Box>
            <Button sx={styleInpKnop} variant="contained" onClick={setFind}>
              <b>Найти</b>
            </Button>
          </Box>
        </Modal>
      </Box>

      <Box sx={{ fontSize: 12, marginTop: -2.4, marginLeft: -2.5, marginRight: -2.5 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ marginRight: -1.5 }}>
              <Grid container>
                <Grid item xs={12} sx={styleXt04}>
                  <Box sx={{ borderRadius: 1, backgroundColor: '#C0C0C0' }}>
                    <HeaderLogins />
                  </Box>
                  <>{isOpen && <TabsLogins valueSort={value} />}</>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Logins;
