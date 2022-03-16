import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import axios from 'axios';

import Logins from './components/Logins';

let extData = '__.__.____';

const App = () => {
  const styleApp01 = {
    fontSize: 14,
    marginRight: 0.5,
    width: '18%',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleApp02 = {
    fontSize: 14,
    marginRight: 0.5,
    borderRadius: 1,
    width: '12%',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#FFE295',
    color: 'black',
    textAlign: 'center',
  };

  const styleModalMenu = {
    fontSize: 13.9,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    textTransform: 'unset !important',
  };

  const styleModal = {
    position: 'relative',
    bottom: '-45vh',
    marginLeft: '60vh',
    transform: 'translate(-50%, -50%)',
    width: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  const [open, setOpen] = React.useState(false);
  const [crossData, setCrossData] = React.useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = (numer: number) => {
    if (numer !== 777) {
      setCrossData(numer);
      setValue('1');
      extData =
        points[numer].slice(11, 13) +
        '.' +
        points[numer].slice(8, 10) +
        '.' +
        points[numer].slice(3, 7);
    }
    setOpen(false);
  };

  const SpisData = () => {
    let resStr = [];
    let stroka = '';
    let strDat = '';

    for (let i = 0; i < points.length; i++) {
      stroka = points[i];
      strDat = stroka.slice(11, 13) + '.' + stroka.slice(8, 10) + '.' + stroka.slice(3, 7);
      resStr.push(
        <Button key={i} sx={styleModalMenu} variant="contained" onClick={() => handleClose(i)}>
          <b>{strDat}</b>
        </Button>,
      );
    }
    resStr.push(
      <Button key={777} sx={styleModalMenu} variant="contained" onClick={() => handleClose(777)}>
        <b>Выход</b>
      </Button>,
    );
    return resStr;
  };

  const ChoiceData = () => {
    return (
      <>
        <Button sx={styleApp01} variant="contained" onClick={handleOpen}>
          <b>Выбор по дате</b>
        </Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
            <Stack direction="column">{SpisData()}</Stack>
          </Box>
        </Modal>
      </>
    );
  };

  const [points, setPoints] = React.useState<Array<string>>([]);
  //const ipAdress: string = 'http://localhost:3000/otladkaGlob.json';
  const ipAdress = window.location.href;

  React.useEffect(() => {
    axios.post(ipAdress).then(({ data }) => {
      setPoints(data.fileNames);
    });
  }, [ipAdress]);

  const [value, setValue] = React.useState('0');

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ marginLeft: 0.5, marginTop: 0.5 }}>
          <Stack direction="row">
            <ChoiceData />
            <Box sx={styleApp02}>{extData}</Box>
            {/* <Button sx={styleApp01} variant="contained" onClick={ResetAll}>
              <b>Сброс настроек</b>
            </Button> */}
          </Stack>
        </Box>
        <TabPanel value="1">
          <Logins logName={points[crossData]} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default App;
