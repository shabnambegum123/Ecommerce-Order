
const { requiredPaths } = require("./cart");
const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productID:{type: mongoose.Schema.Types.ObjectId, required: true, },
//   productSize:{ type:Array,required:true },
//   productColor:{type:Array,required:true }

// })

const orderSchema = new mongoose.Schema({
  TotalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pinCode:{type:Number,required:true},
 Address:{type:Array,required:true},
  cartId:{type:String,required:true},
  products: {type:Array,required:true}
});

module.exports = orderSchema;

