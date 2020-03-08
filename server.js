const express = require('express');
const app = express();
const socket = require('socket.io');
const path = require('path');

const PORT = 3000;
const server = app.listen(3000, () => console.log(`Listening on port ${PORT}`));

// Serve static files
app.use(express.static(path.join(__dirname, './client')));

// Socket setup
const io = socket(server);

io.on('connection', socket => {
  console.log(`Socket connection established: ${socket.id}`);
});

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));
