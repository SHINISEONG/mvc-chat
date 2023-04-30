import React, { FC, useState } from 'react';

import { Alert, Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { IChannel } from '@/typings/db';
import { useParams } from 'react-router';
interface Props {
  data: IChannel;
  key: string;
}

const Chat: FC<Props> = ({ data }) => {
  const { id } = useParams();
  let messageColor = 'gray';
  let messageBackColor = 'lightgray';
  let offset = 0.2;
  if (id === data.userId) {
    messageBackColor = 'lightblue';
    messageColor = 'darkblue';
    offset = 6;
  }
  return (
    <Stack>
      {id !== data.userId && data.userId}
      <Grid container xsOffset={offset} mdOffset={offset} xs={6} md={6}>
        <Alert
          sx={{
            margin: 1,
            backgroundColor: `${messageBackColor}`,
            color: `${messageColor}`,
            minWidth: '90%',
            maxWidth: '90%',
            overflowWrap: 'break-word',
          }}
          icon={false}
        >
          {data.content}
        </Alert>
      </Grid>
    </Stack>
  );
};

export default Chat;
