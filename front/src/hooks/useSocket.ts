import io, { Socket } from 'socket.io-client';

import { useCallback } from 'react';

const backUrl = `http://${import.meta.env.VITE_SPRING_SVR_URL}:8909`;

const sockets: { [key: string]: Socket } = {};
const useSocket = (chattype?: string): [Socket | undefined, () => void] => {
  console.log('rerender', chattype);

  const disconnect = useCallback(() => {
    if (chattype) {
      sockets[chattype].disconnect();
      delete sockets[chattype];
    }
  }, [chattype]);

  if (!chattype) {
    return [undefined, disconnect];
  }

  if (!sockets[chattype]) {
    console.log(`${backUrl}/ct-${chattype}`);

    sockets[chattype] = io(`${backUrl}/ct-${chattype}`, {
      transports: ['websocket'],
      // credentials: true,
    });
  }

  return [sockets[chattype], disconnect];
};

export default useSocket;
