import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    imageKey: { type: String }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);