'use strict';

var WebSocket = require('ws');
var ws = new WebSocket('ws://literature.uncontext.com'); // todo: configure
var socketio = require('socket.io');

module.exports = function (server) {
  var io = socketio(server);

  io.on('connection', function (socket) {
    ws.on('message', socket.emit.bind(socket, 'message'));
  });

};
