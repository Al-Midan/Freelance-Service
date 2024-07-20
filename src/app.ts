import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./presentation/routes/freelanceRouter";
import connectDb from "./config/db/connect";
import { kafkaConsumer } from "./infrastructure/broker/kafkaBroker/kafkaConsumer";
const app = express();
dotenv.config();
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
async function startApp() {
  try {
    await connectDb;
    console.log("MongoDB connected successfully");

    await kafkaConsumer.init();
    console.log("Kafka consumer initialized successfully");

    const PORT = process.env.PORT || 5004;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the application:", err);
    process.exit(1);
  }
}
startApp();