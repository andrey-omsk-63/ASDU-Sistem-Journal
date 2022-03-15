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
  type: string;
  time: string;
  info: string;
  haveError: boolean;
}

const Logins = () => {
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

  const styleServis = {
    fontSize: 14,
    marginTop: -2.8,
    marginLeft: 'auto',
    marginRight: 0,
    maxHeight: '21px',
    minHeight: '21px',
    width: '4%',
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
    if (props.valueSort !== 1) {
      // сортировка по time
      massPoints = massPointsEt;
    } else {
      // сортировка по type
      massPoints.sort((a, b) => a.num - b.num);
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

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  let massPoints: Array<Line> = [];
  let massPointsEt: Array<Line> = [];
  let maskPoints: Array<Line> = [
    {
      num: 0,
      type: '',
      time: '',
      info: '',
      haveError: false,
    },
  ];

  const ipAdress: string = 'http://localhost:3000/otlmess.json';

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.logData);
      setIsOpen(true);
    });
  }, [ipAdress]);

  if (isOpen) {
    //console.log('points:', points, points[1].message.slice(0, 1));
    for (let i = 0; i < points.length; i++) {
      maskPoints = [
        {
          num: 0,
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
    }
    massPointsEt = massPoints;
  }

  let formSett = '';
  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => setOpenSet(true);
  const handleCloseSet = (event: any, reason: string) => {
    if (reason !== 'backdropClick') setOpenSet(false);
  };

  const InpForm = () => {
    const [valuen, setValuen] = React.useState(formSett);
    const handleChange = (event: any) => {
      setValuen(event.target.value);
      formSett = event.target.value;
    };

    return (
      <TextField
        size="small"
        label="Поиск"
        value={valuen}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  return (
    <Box>
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
            <Button sx={styleInpKnop} variant="contained" onClick={() => setOpenSet(false)}>
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
