import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT);

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
