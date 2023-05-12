import { useEffect, useState, FormEvent, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import useSocket from '@/hooks/useSocket';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/fetcher';
import { IChat } from '@/typings/db';
import ChatBox from '@/components/ChatBox';
import useInput from '@/hooks/useInput';
import axios from 'axios';
import ChatList from '@/components/ChatList';

import useSWR from 'swr';

import { Box } from '@mui/material';

const DirectMessage = () => {
  const { chattype, channel } = useParams();
  const boxRef = useRef<HTMLDivElement>(null);

  const { data: myData } = useSWR(
    `http://${import.meta.env.VITE_SPRING_SVR_URL}:8080/api/users/session`,
    fetcher
  );
  const [myChannel, setMyChannel] = useState(myData?.userId);
  useEffect(() => {
    if (myData?.role === 'admin') {
      setMyChannel(channel);
    }
  }, [myData, channel]);

  console.log(chattype);
  const [socket] = useSocket(chattype);

  useEffect(() => {
    if (myChannel && socket) {
      console.log('login?');
      console.log('id', myData.userId);
      console.log('channel', myChannel);
      socket.emit('login', {
        id: myData.userId,
        channel: myChannel,
      });
    }
  }, [socket, myChannel, myData]);

  const {
    data: chatData,
    mutate: chatMutate,
    // setSize,
  } = useSWRInfinite<IChat>(
    () =>
      `http://${
        import.meta.env.VITE_SPRING_SVR_URL
      }:8909/api/chattypes/${chattype}/channels/${myChannel}/chats`,
    fetcher
  );

  const [chat, onChangeChat, setChat] = useInput('');

  const scrollToBottom = useCallback(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
      console.log(
        boxRef.current.scrollTop,
        boxRef.current.scrollHeight,
        boxRef.current.clientHeight
      );
      window.scrollTo({ top: boxRef.current.scrollHeight });
    }
  }, [boxRef, chatData, chat]);

  // useEffect(() => {
  //   return () => {
  //     discconect();
  //   };
  // }, [chattype, discconect]);

  const onSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(
            `http://${
              import.meta.env.VITE_SPRING_SVR_URL
            }:8909/api/chattypes/${chattype}/channels/${myChannel}/chats`,
            {
              userId: myData.userId,
              channel: myChannel,
              content: chat,
            },
            { withCredentials: true }
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
  }, [chatMutate, scrollToBottom]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, scrollToBottom]);

  if (
    chattype === undefined ||
    myChannel === undefined ||
    chatData === undefined
  ) {
    return null;
  }
  console.log(chatData);

  return (
    <div ref={boxRef}>
      <Box>
        <ChatList chatData={chatData} />
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <ChatBox
            chat={chat}
            onSubmitForm={onSubmitForm}
            onChangeChat={onChangeChat}
          />
        </Box>
      </Box>
    </div>
  );
};

export default DirectMessage;
