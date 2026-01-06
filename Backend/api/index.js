import express from "express";
import cors from "cors";
import sportsRoutes from "../routes/sports.js";
import athleticsRoutes from "../routes/athletics.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", sportsRoutes);
app.use("/api/athletics", athleticsRoutes);

// Export the Express app for Vercel serverless functions
export default app;
