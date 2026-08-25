require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect Database
connectDB();

// CORS Middleware
app.use(cors({
  origin: '*', // Allow connections from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/materials', require('./routes/materialRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ status: 'EduFlow Server Active' });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EduFlow Backend Service running on port ${PORT}`);
});
