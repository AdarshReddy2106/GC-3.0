import express from "express";
import cors from "cors";
import sportsRoutes from "./routes/sports.js";
import athleticsRoutes from "./routes/athletics.js";

const app = express();

// Completely permissive CORS - allow all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GC 2026 Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      schedule: '/api/:sport/schedule/:gender',
      leaderboard: '/api/:sport/leaderboard/:gender',
      athletics: '/api/athletics/:event/:gender'
    },
    availableSports: ['volleyball', 'basketball', 'badminton', 'tabletennis', 'cricket', 'football', 'chess'],
    genders: ['men', 'women']
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use("/api", sportsRoutes);
app.use("/api/athletics", athleticsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    path: req.path 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
