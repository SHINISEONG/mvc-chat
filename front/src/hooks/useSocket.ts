import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://192.168.0.10:8909';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (
  workspace?: string
): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerender', workspace);

  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    console.log(`${backUrl}/ws-${workspace}`);

    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
      // credentials: true,
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
