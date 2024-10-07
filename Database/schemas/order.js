const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  TotalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pinCode: { type: Number, required: true },
  Address: { type: Array, required: true },
  cartId: { type: String, required: true },
  products: { type: Array, required: true },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

module.exports = orderSchema;
