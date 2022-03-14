import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
    padding: 1,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG021 = {
    borderRadius: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
  };

  const styleXTG04 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
  };

  const HeaderLogins = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1} sx={styleXTG021}>
          <b>Тип</b>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <b>Время</b>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <b>IP</b>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <b>Логин</b>
        </Grid>
        <Grid item xs={1} sx={styleXTG02}>
          <b>Ресурс</b>
        </Grid>
        <Grid item xs={7} sx={styleXTG021}>
          <b>Сообщение</b>
        </Grid>
      </Grid>
    );
  };

  const StrokaLogins = () => {
    let resStr = [];

    for (let i = 0; i < points.length; i++) {
      resStr.push(
        <Grid key={Math.random()} item container xs={12}>
          <Grid key={Math.random()} item xs={1} sx={styleXTG03}>
            <b>{points[i].message.slice(0, 6)}</b>
          </Grid>
          <Grid key={Math.random()} item xs={1} sx={styleXTG03}>
            <b>{points[i].message.slice(20, 28)}</b>
          </Grid>
          <Grid key={Math.random()} item xs={1} sx={styleXTG03}>
            <b>---</b>
          </Grid>
          <Grid key={Math.random()} item xs={1} sx={styleXTG03}>
            <b>---</b>
          </Grid>
          <Grid key={Math.random()} item xs={1} sx={styleXTG03}>
            <b>---</b>
          </Grid>
          <Grid key={Math.random()} item xs={7} sx={styleXTG04}>
            <b>{points[i].message.slice(29)}</b>
          </Grid>
        </Grid>,
      );
    }

    return resStr;
  };

  const [points, setPoints] = React.useState<Array<LogDatum>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const ipAdress: string = 'http://localhost:3000/otlmess.json';

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.logData);
      setIsOpen(true);
    });
  }, [ipAdress]);

  if (isOpen) console.log('points:', points, points[1].message.slice(20, 28));

  return (
    <Box sx={{ fontSize: 12, marginTop: -2.4, marginLeft: -2.5, marginRight: -2.5 }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ marginRight: -1.5 }}>
            <Grid container>
              <Grid item xs={12} sx={styleXt04}>
                <Box>
                  <HeaderLogins />
                </Box>
                <Box sx={{ overflowX: 'auto', height: '88vh' }}>{StrokaLogins()}</Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Logins;
