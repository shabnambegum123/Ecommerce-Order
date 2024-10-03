
const mongoose = require("mongoose");
const cartSchema = require("../schemas/cart");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart