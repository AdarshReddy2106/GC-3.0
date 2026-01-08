import express from "express";
import cors from "cors";
import sportsRoutes from "../routes/sports.js";
import athleticsRoutes from "../routes/athletics.js";

const app = express();

// Configure CORS to allow your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://gc-3-0.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false,
  optionsSuccessStatus: 200
}));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use("/api", sportsRoutes);
app.use("/api/athletics", athleticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    path: req.path 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Export the Express app for Vercel serverless functions
export default app;
