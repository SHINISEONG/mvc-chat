import { FC } from 'react';

import { Alert, Avatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { IChannel } from '@/typings/db';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
interface Props {
  data: IChannel;
  key: string;
}

const Chat: FC<Props> = ({ data }) => {
  const { data: myData } = useSWR(
    `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
    fetcher
  );

  let messageColor = 'gray';
  let messageBackColor = 'lightgray';
  let offset = 0.3;
  if (myData?.userId === data.userId) {
    messageBackColor = 'primary';
    messageColor = 'darkgreen';
    offset = 7;
  }
  return (
    <Grid container xsOffset={offset} mdOffset={offset} xs={5} md={5}>
      <Stack direction={'row'} sx={{ maxWidth: '100%', minWidth: '100%' }}>
        <Stack>
          {myData?.userId !== data.userId && <Avatar alt="Remy Sharp" />}
          {myData?.userId !== data.userId && data.userId}
        </Stack>

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
          {data.content.split('\n').map((line, index) => (
            <Typography key={index} component="div">
              {line}
            </Typography>
          ))}
        </Alert>
      </Stack>
    </Grid>
  );
};

export default Chat;
