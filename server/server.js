import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Configure Socket.io with CORS for Vite dev server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST"]
  }
});

const port = Number(process.env.PORT) || 3456;

server.listen(port, () => {
  console.log(`Socket.io server listening on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('talking', (data) => {
    console.log('Received event:', data);
    io.emit('listening', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
