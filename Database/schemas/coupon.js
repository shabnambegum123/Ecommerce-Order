const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true, 
  },
  discount: {
    type: Number,
    required: true,
    min: 0, 
  },
  productIds: {
    type: [String], 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
});

module.exports = couponSchema;