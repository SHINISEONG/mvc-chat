const SocketIO = require('socket.io');

const onlineMap = {};

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://192.168.0.10:5173',
      methods: ['GET', 'POST'],
    },
  });
  app.set('io', io);
  app.set('onlineMap', onlineMap);

  const dynamicNsp = io.of(/^\/ws-.+$/).on('connect', (socket) => {
    console.log('on connect');
    const newNamespace = socket.nsp;

    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }

    socket.emit('hello', socket.nsp.name);

    socket.on('login', ({ id, channel }) => {
      console.log('on login');
      onlineMap[socket.nsp.name][socket.id] = id;
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name])
      );

      socket.join(`${socket.nsp.name}-${channel}`);
    });

    socket.on('disconnect', () => {
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name])
      );
    });
  });
};
