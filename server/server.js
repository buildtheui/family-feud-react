import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Serve static files from the React app build directory
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory (one level up from server folder)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Configure Socket.io with CORS for Vite dev server (keep for local dev)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST"]
  }
});

const port = Number(process.env.PORT) || 3456;

// Handle SPA routing: serve index.html for any unknown route
// Note: Express 5 requires regex or named params for catch-all
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

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
