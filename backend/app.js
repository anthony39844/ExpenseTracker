import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
const routes = ["./routes/routes.js"];

for (const route of routes) {
  const router = await import(route);
  app.use("/api/v1", router.default);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
