import { useCallback } from 'react';

import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';

const ChatButton = () => {
  const { data: myData } = useSWR(
    `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
    fetcher
  );

  const navigate = useNavigate();

  const onClickChatIcon = useCallback(() => {
    if (myData.role !== 'admin') {
      navigate(`/chattypes/inquiry/channels/${myData?.userId}`);
    } else {
      navigate('/chattypes/inquiry/channels');
    }
  }, [history, myData?.userId]);

  return (
    <Fab
      color="primary"
      sx={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
      onClick={onClickChatIcon}
    >
      <ChatIcon />
    </Fab>
  );
};

export default ChatButton;
