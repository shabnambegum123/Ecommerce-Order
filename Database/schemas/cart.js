const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min:1,
    default:1
  },
  isSavedLater: {
    type: Boolean,
    default: false, 
  },
  isRemove: {
    type: Boolean,
    default: false, 
  },
  productSize:{
    type:Array,
    required: true,
    trim: true,
  },
  productColor:{
    type:Array,
    required: true,
    trim: true,
  }
});


const cartSchema = new mongoose.Schema({
  products: {
    type: [productSchema], 
    default: [], 
  },
  TotalAmount: {
    type: Number,
    required: true,
   },
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    defaule:null
  },
  couponCode: {
    type: String,
    required: true,
    trim: true,
  },
  couponCodeDiscount:{
    type: Number,
    required: true,
  }
  
});



module.exports = cartSchema;
