import React, { useEffect, useState, FormEvent, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router';
import useSocket from '@/hooks/useSocket';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/fetcher';
import { IChannel } from '@/typings/db';
import ChatBox from '@/components/ChatBox';
import useInput from '@/hooks/useInput';
import axios from 'axios';
import ChatList from '@/components/ChatList';
import { mutate } from 'swr';
import useIpStore from '@/hooks/useIpStore';

const DirectMessage = () => {
  const { expressSvrIp } = useIpStore();

  const { workspace, channel, id } = useParams() as {
    workspace: string;
    channel: string;
    id: string;
  };

  console.log(workspace, channel);
  const [socket, discconect] = useSocket(workspace);

  useEffect(() => {
    if (channel && socket) {
      socket?.emit('login', {
        id: channel,
        channel: channel,
      });
    }
  }, [socket, channel]);

  const {
    data: chatData,
    mutate: chatMutate,
    setSize,
  } = useSWRInfinite<IChannel>(
    (index) =>
      `http://${expressSvrIp}/api/workspaces/${workspace}/channels/${channel}/senderid/${id}/chats`,
    fetcher
  );

  const [chat, onChangeChat, setChat] = useInput('');

  useEffect(() => {
    return () => {
      discconect();
    };
  }, [workspace, discconect]);

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(
            `http://${expressSvrIp}/api/workspaces/${workspace}/channels/${channel}/senderid/${id}/chats`,
            {
              content: chat,
            }
          )
          .then(() => {
            chatMutate();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat]
  );

  const onMessage = useCallback(() => {
    chatMutate();
  }, []);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  if (
    workspace === undefined ||
    channel === undefined ||
    chatData === undefined
  ) {
    return <div>'로딩중'</div>;
  }
  console.log(chatData);

  return (
    <>
      <ChatList chatData={chatData} />
      <ChatBox
        chat={chat}
        onSubmitForm={onSubmitForm}
        onChangeChat={onChangeChat}
      />
    </>
  );
};

export default DirectMessage;
