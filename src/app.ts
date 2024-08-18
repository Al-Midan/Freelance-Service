import express from "express";
import dotenv from "dotenv";
import http from 'http';
import cors from "cors";
import router from "./presentation/routes/freelanceRouter";
import connectDb from "./config/db/connect";
import { Server } from 'socket.io';
import { kafkaConsumer } from "./infrastructure/broker/kafkaBroker/kafkaConsumer";

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://al-midan-frontend.vercel.app',
  'https://localhost:3000',
  'http://13.71.112.129',
  'https://peducoggsc.execute-api.ap-south-1.amazonaws.com'
];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    //origin: process.env.FRONTEND_URL, 
    origin: "https://al-midan-frontend.vercel.app", 
    methods: ['GET', 'POST'],
  },
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('user_connected', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} connected`);
  });

  socket.on('new_message', (message) => {
    console.log('New message received:', message);
    console.log('New message received:', message);
    const receiverSocketId = connectedUsers.get(message.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('new_message', message);
    }
  });

  socket.on('offer_response', (updatedMessage) => {
    console.log('Offer response received:', updatedMessage);
    const senderSocketId = connectedUsers.get(updatedMessage.sender);
    if (senderSocketId) {
      io.to(senderSocketId).emit('offer_update', updatedMessage);
    }
    const receiverSocketId = connectedUsers.get(updatedMessage.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('offer_update', updatedMessage);
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

async function startApp() {
  try {
    await connectDb;
    console.log("MongoDB connected successfully");

    await kafkaConsumer.init();
    console.log("Kafka consumer initialized successfully");

    const PORT = process.env.PORT || 5004;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the application:", err);
    process.exit(1);
  }
}

startApp();