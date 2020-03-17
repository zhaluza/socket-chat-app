const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const PORT = 3000;
const server = app.listen(3000, () => console.log(`Listening on port ${PORT}`));

// Serve static files
app.use(express.static(path.join(__dirname, './client')));

// Socket setup
const io = socket(server);

io.on('connection', socket => {
  console.log(`Socket connection established: ${socket.id}`);

  // Join room when 'room' event is emitted
  socket.on('room', data => {
    socket.join('some room', err => {
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${'some room'}`);
    console.log(io.sockets.adapter.rooms);
  });

  // Handle chat event
  socket.on('chat', data => {
    io.to('some room').emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', data => {
    io.to('some room').emit('typing', data);
  });
});
