
const mongoose = require("mongoose");
const OrderSchema = require("../schemas/order");

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order

