// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://avenger:assemble@cluster0.rxbmgda.mongodb.net/cafeteria';

// Connect to MongoDB
connectDB(MONGODB_URI);

// Middlewares
app.use(express.json());

// Configure CORS - allow common methods + Authorization header.
// Adjust origin for production if you want to restrict to your frontend domain.
app.use(
  cors({
    origin: '*', // change to your frontend origin in production, e.g. "https://my-site.com"
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Simple health/test route
app.get('/', (req, res) => res.send('☕ Cafeteria API running successfully!'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
