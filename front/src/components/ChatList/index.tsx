import Chat from '@components/Chat';
import { Alert, Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { IDM, IChat, IChannel } from '@typings/db';
import React, {
  useCallback,
  forwardRef,
  RefObject,
  MutableRefObject,
  useRef,
  FC,
} from 'react';

interface Props {
  chatData: IChannel[];
}

const ChatList: FC<Props> = ({ chatData }) => {
  return (
    <Box
      className="class"
      sx={{
        height: 500,
        overflowX: 'scroll',
      }}
    >
      {chatData[0].map((chat, i) => (
        <Chat key={chat._id} data={chat} />
      ))}
    </Box>
  );
};

export default ChatList;
