import WebSocket from 'ws';
import socketio from 'socket.io';

const ws = new WebSocket('ws://literature.uncontext.com'); // todo: configure

export default function (server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    ws.on('message', socket.emit.bind(socket, 'message'));
  });
}
