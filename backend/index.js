import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_URL }));

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello from the backend");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
