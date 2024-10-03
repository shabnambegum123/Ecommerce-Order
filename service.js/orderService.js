const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { messages } = require("../response/customMessage");
const {
  getAddress,
  getProduct,
  getProductLoop,
} = require("../apiService/internalService");
const Order = require("../Database/modal/order");
const cart = require("../Database/modal/cart");

const createOrderService = async (params) => {
  try {
    let find = await cart.findOne({ _id: params.cartId });
    let Object = {
      userId: params.userId,
    }
    let axios = await getAddress(Object)

    if (!axios.address) {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.address,
        data: [],
      };
    }

    let data = find.products;
    let a = [];
    let map = data.map((x) => {
      a.push(x.productId);
      return x;
    });

    let object = {
      productId: a,
    };
    const product = await getProductLoop(object);
    console.log(product, find, 887);

    console.log(656, product);

    let check = product.map((x) => {
      return {
        productId: x._id,
        DefaultSize: x.DefaultSize,
        DefaultColor: x.DefaultColor,
      };
    });
    let discountAmount = find.TotalAmount * (find.couponCodeDiscount / 100);
    let passData = {
      TotalAmount: find.TotalAmount,
      pinCode: axios.address.pinCode,
      Address: axios.address || params.Address,
      cartId: find._id,
      products: [check],
      TotalAmount: find.TotalAmount - discountAmount,
    };

    let createOrder = await Order.create(passData);
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

module.exports = { createOrderService };
