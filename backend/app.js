import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();

// Check for required environment variables
if (!process.env.SESSION_SECRET) {
  console.error(
    "ERROR: Required environment variable is not properly configured"
  );
  process.exit(1);
}

const app = express();

connectDB();

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collection: "sessions",
  ttl: 24 * 60 * 60, 
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    name: "sessionId", 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
    store: sessionStore,
    rolling: true, 
  })
);

// Routes
const routes = ["./routes/transactions.js"];

for (const route of routes) {
  const router = await import(route);
  app.use("/api/v1", router.default);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
