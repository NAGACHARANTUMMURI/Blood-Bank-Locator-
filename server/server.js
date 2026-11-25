require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const corsConfig = require('./config/cors');
const globalErrorHandler = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsConfig.origin,
    credentials: true
  }
});

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.get('/', (req, res) => {
  res.json({ message: 'Blood Bank Locator API', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, server, io };