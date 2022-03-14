import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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

let flagOutput = true;

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
    //borderRadius: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    //padding: 1,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG021 = {
    borderRadius: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    //padding: 1,
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

  const SortType = () => {
    // сортировка по type
    console.log('massPoints:', massPoints);

    massPoints.sort((a, b) => a.num - b.num);

    console.log('massPoints_:', massPoints);
    flagOutput = true;
    
  }

  const HeaderLogins = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG021}>
          <Button sx={styleBut01} onClick={SortType}>
            <b>Тип</b>
          </Button>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <Button sx={styleBut01}>
            <b>Время</b>
          </Button>

        </Grid>
        <Grid item xs={9.5} sx={styleXTG021}>
          <b>Сообщение</b>
        </Grid>
      </Grid>
    );
  };

  const StrokaLogins = (flag: boolean) => {
    let resStr = [];
    // let typeMess = '';

    for (let i = 0; i < points.length; i++) {
      resStr.push(
        <Grid key={Math.random()} item container xs={12}>
          <Grid key={Math.random()} item xs={1.5} sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}>
            <b>{massPoints[i].type}</b>
          </Grid>
          <Grid key={Math.random()} item xs={1} sx={massPoints[i].haveError ? styleXTG033 : styleXTG03}>
            <b>{massPoints[i].time}</b>
          </Grid>
          <Grid key={Math.random()} item xs={9.5} sx={massPoints[i].haveError ? styleXTG044 : styleXTG04}>
            <b>{massPoints[i].info}</b>
          </Grid>
        </Grid>,
      );
    }
    flagOutput = false;

    return resStr;
  };

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  //let points: Array<LogDatum> = [];
  let massPoints: Array<Line> = [];
  let maskPoints: Array<Line> = [
    {
      num: 0,
      type: '',
      time: '',
      info: '',
      haveError: false,
    }
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
        }
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
      maskPoints[0].info = points[i].message.slice(29)

      massPoints.push(maskPoints[0])
    }
  }

  return (
    <Box>
      <Box sx={styleServis}>
        <Button sx={styleServisKnop}>
          <b>Сервис</b>
        </Button>
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
                  <Box sx={{ overflowX: 'auto', height: '88vh' }}>
                    <>
                      {isOpen && (
                        <>
                          {flagOutput && (
                            <>
                              {StrokaLogins(flagOutput)}
                            </>
                          )}
                        </>
                      )}
                    </>
                  </Box>
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
