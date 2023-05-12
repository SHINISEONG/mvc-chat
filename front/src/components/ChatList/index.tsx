import Chat from '@components/Chat';
import { Box } from '@mui/material';

import { IChat } from '@typings/db';
import { FC } from 'react';

interface Props {
  chatData: IChat[];
}

const ChatList: FC<Props> = ({ chatData }) => {
  return (
    <Box
      sx={{
        marginTop: '64px',
        marginBottom: '64px',
      }}
    >
      {chatData[0].map((chat: IChat) => (
        <Chat key={chat._id} data={chat} />
      ))}
    </Box>
  );
};

export default ChatList;
