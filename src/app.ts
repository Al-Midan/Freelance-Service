import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./presentation/routes/freelanceRouter" 
import connectDb from "./config/db/connect"
const app = express()
dotenv.config()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)
connectDb
  .then(() => {
    console.log('MongoDB connected successfully');

    // Start the server
    const PORT = process.env.PORT || 5004;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err:Error) => {
    console.error('Error connecting to MongoDB:', err);
  });