import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
const app = express();

// ✅ JSON parser
app.use(express.json());

// ✅ CORS setup — allow frontend on Render & local dev
// const allowedOrigins = [
//   'https://noque-frontend.onrender.com', // your Render frontend URL
//   'http://localhost:5173', // local dev
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('CORS not allowed'));
//       }
//     },
//     credentials: true,
//   })
// );
app.use(cors({
  origin: [
    'https://noque-ui.onrender.com', // your frontend
    'http://localhost:5173'          // for local testing (optional)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// ✅ MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://avenger:assemble@cluster0.rxbmgda.mongodb.net/cafeteria';
await connectDB(MONGODB_URI);

// ✅ Test route
app.get('/', (req, res) => res.send('Cafeteria API running ✅'));

// ✅ Main routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
