const express = require("express");
const cors = require("cors");

const scheduleRoutes = require("./routes/schedule.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/schedule", scheduleRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

module.exports = app;
