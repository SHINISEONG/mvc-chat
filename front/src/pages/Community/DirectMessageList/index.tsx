import React, { useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useNavigate, useParams } from 'react-router';

export default function DirectMessageList() {
  const navigate = useNavigate();

  // const { data: myData, mutate: mutateMe } = useSWR(
  //   `http://192.168.0.10:8080/api/users/session`,
  //   fetcher
  // );

  const { chattype } = useParams();

  const { data: channelListData } = useSWR(
    `http://${
      import.meta.env.VITE_SPRING_SVR_URL
    }:8909/api/chattypes/${chattype}/channels`,
    fetcher
  );

  const onClickChannel = useCallback(
    (event: React.MouseEvent) => {
      const { id } = event.currentTarget;
      navigate(`/chattypes/inquiry/channels/${id}`);
    },
    [channelListData]
  );

  return (
    <Box sx={{ maxWidth: '98%', width: '98%', marginTop: '64px' }}>
      {channelListData?.map((channel: string, i: number) => (
        <List
          key={i}
          id={channel}
          onClick={onClickChannel}
          sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" />
            </ListItemAvatar>
            <ListItemText
              primary={channel}
              secondary={<React.Fragment>{'Recent Message'}</React.Fragment>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </Box>
  );
}
