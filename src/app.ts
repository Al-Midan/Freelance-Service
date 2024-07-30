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
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new_message', (message) => {
    io.emit('new_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
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