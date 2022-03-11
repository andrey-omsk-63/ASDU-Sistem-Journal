import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import axios from 'axios';

//import Header from './components/Header/Header';
//import Management from './components/Management/Management';
//import Points from './components/Points/Points';
//import Statistics from './components/Statistics/Statistics';

//import { Tflight } from './interfaceMNG.d';

//import { XctrlInfo } from './interfaceGl.d';

//import { Statistic } from './interfaceStat.d';

export interface InpDate {
  fileNames: string[];
  message: string;
}


const App = () => {
  const styleApp01 = {
    fontSize: 14,
    marginRight: 1,
    width: '21%',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleApp02 = {
    fontSize: 14,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    width: '20%',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  // const styleAppExit = {
  //   fontSize: 14,
  //   marginLeft: 'auto',
  //   marginRight: 0,
  //   maxHeight: '21px',
  //   minHeight: '21px',
  //   width: '9%',
  //   backgroundColor: '#F1F3F4',
  //   color: 'black',
  //   textTransform: 'unset !important',
  // };

  const styleMod = {
    position: 'absolute',
    top: '22.8%',
    left: '47.7%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderColor: 'red',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const styleBatMenu = {
    fontSize: 14,
    backgroundColor: '#F1F3F4',
    color: 'red',
    marginTop: 1,
    textTransform: 'unset !important',
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
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 1,
  };

  const [open, setOpen] = React.useState(false);
  const [crossData, setCrossData] = React.useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = (numer: number) => {
    if (numer !== 777) {
      setCrossData(numer)
      setValue('1')
    }
    setOpen(false);
  };

  const SpisData = () => {
    let resStr = [];
    for (let i = 0; i < points.length; i++) {
      resStr.push(
        <Button key={i} sx={styleModalMenu} variant="contained" onClick={() => handleClose(i)}>
          <b>
            {points[i]}
          </b>
        </Button>,
      );
    }
    resStr.push(
      <Button key={777} sx={styleModalMenu} variant="contained" onClick={() => handleClose(777)}>
        <b>
          Выход
        </b>
      </Button>,
    );
    return resStr;
  };

  const ChoiceData = () => {
    return (
      <>
        <Button sx={styleApp01} variant="contained" onClick={handleOpen}>
          <b>Выберите дату</b>
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
    )
  }

  // const Close = () => {
  //   return <h1>
  //     Выход
  //     //{window.close()}
  //   </h1>

  // };

  const [points, setPoints] = React.useState<Array<InpDate>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const ipAdress: string = 'http://localhost:3000/otladkaGlob.json';

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.fileNames);
      setIsOpen(true);
    });
  }, [ipAdress]);

  const [value, setValue] = React.useState('1');

  return (
    <>

      <Box sx={{ width: '98.8%', typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.5, backgroundColor: '#F1F5FB' }}>
            <Stack direction="row">
              <ChoiceData />
              <Button sx={styleApp01} variant="contained" onClick={() => setValue('2')}>
                <b>Выход</b>
              </Button>
            </Stack>
          </Box>
          <TabPanel value="1">
            <h1> {points[crossData]} </h1>
          </TabPanel>
          <TabPanel value="2">
            <h1>
              Выход
            </h1>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;
