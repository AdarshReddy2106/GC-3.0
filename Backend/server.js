import express from "express";
import cors from "cors";
import sportsRoutes from "./routes/sports.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", sportsRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
