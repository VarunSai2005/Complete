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

// ✅ Connect to MongoDB
await connectDB(MONGODB_URI);

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Configure CORS safely
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['*']; // default fallback

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Test route
app.get('/', (req, res) => res.send('☕ Cafeteria API running successfully!'));

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
