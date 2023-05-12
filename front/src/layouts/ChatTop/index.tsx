import { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Outlet, useNavigate } from 'react-router';

const ChatTop = () => {
  const navigate = useNavigate();
  const onClickPrevious = useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={onClickPrevious}
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            &lt;
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React# Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <></>
      <Outlet />
    </Box>
  );
};

export default ChatTop;
