
const mongoose = require("mongoose");
const couponSchema = require("../schemas/coupon");

const coupon = mongoose.model("coupon", couponSchema);

module.exports = coupon

