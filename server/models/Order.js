// backend/models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: false },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    // align default status with allowed values in routes
    status: { type: String, default: 'placed' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
