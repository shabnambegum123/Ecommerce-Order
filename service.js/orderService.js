// const { statusCodes } = require("../response/httpStatusCode");
// const { statusMessage } = require("../response/httpStatusMessage");
// const { messages } = require("../response/customMessage");
// const {
//   getAddress,
//   getProduct,
//   getProductLoop,
// } = require("../apiService/internalService");
// const Order = require("../Database/modal/order");
// const cart = require("../Database/modal/cart");
// const coupon = require("../Database/modal/coupon");

// const createOrderService = async (params) => {
//   try {
//     let find = await cart.findOne({ _id: params.cartId });
//     let Object = {
//       userId: params.userId,
//     };
//     let axios = await getAddress(Object);
//     if (!axios.address) {
//       return {
//         status: false,
//         statusCode: statusCodes?.HTTP_BAD_REQUEST,
//         message: messages?.address,
//         data: [],
//       };
//     }

//     let data = find.products;
//     let a = [];
//     let map = data.map((x) => {
//       a.push(x.productId);
//       return x;
//     });
//     let object = {
//       productId: a,
//     };
//     const product = await getProductLoop(object);

//     let check = product.map((x) => {
//       return {
//         productId: x._id,
//         productSize: x.productSize,
//         productColor: x.productColor,
//       };
//     });

//     let Cart = await cart.findOne();
//     console.log(Cart, 88);
//     let Coupon = await coupon.findOne();
//     const cartProductIds = Cart.products.map((x) => x.productId.toString());
//     console.log(cartProductIds, 987665);
//     const matchingProductIds = Coupon.productIds.filter((x) =>
//       cartProductIds.includes(x)
//     );
//     console.log(123, matchingProductIds);
//     const cartProduct = await cart.findOne();
//     let loopCart = cartProduct.products;
//     for (let x of loopCart) {
//     }
//     console.log(90, cartProduct);

//     return;
//     let discountAmount = find.TotalAmount * (find.couponCodeDiscount / 100);
//     let passData = {
//       TotalAmount: find.TotalAmount,
//       pinCode: axios.address.pinCode,
//       Address: axios.address || params.Address,
//       cartId: find._id,
//       products: [check],
//       TotalAmount: find.TotalAmount - discountAmount,
//     };

//     let createOrder = await Order.create(passData);
//   } catch (error) {
//     return {
//       status: false,
//       statusCode: statusCodes?.HTTP_BAD_REQUEST,
//       message: error.message,
//     };
//   }
// };

// module.exports = { createOrderService };


const { statusCodes } = require("../response/httpStatusCode");
const { messages } = require("../response/customMessage");
const { getAddress, getProduct, getProductLoop } = require("../apiService/internalService");
const Order = require("../Database/modal/order");
const Cart = require("../Database/modal/cart");
const Coupon = require("../Database/modal/coupon");
const { object } = require("joi");

const createOrderService = async (params) => {
  try {
    const foundCart = await Cart.findOne({ _id: params.cartId });
    if (!foundCart) {
      return {
        status: false,
        statusCode: statusCodes.HTTP_BAD_REQUEST,
        message: messages.cartNotFound,
        data: [],
      };
    }
    let Object = {
            userId: params.userId,
          };

    const addressResponse = await  getAddress(Object);
    if (!addressResponse.address) {
      return {
        status: false,
        statusCode: statusCodes.HTTP_BAD_REQUEST,
        message: messages.address,
        data: [],
      };
    }

    const cartProductIds = foundCart.products.map(product => product.productId.toString());


    const foundCoupon = await Coupon.findOne({ /* Add any relevant filter here */ });
    let discountAmount = 0;

    if (foundCoupon) {
      const matchingProductIds = foundCoupon.productIds.filter(id => cartProductIds.includes(id));
      if (matchingProductIds.length > 0) {
        discountAmount = foundCoupon.discount; 
      }
    }

    const totalAmountAfterDiscount = Math.max(foundCart.TotalAmount - discountAmount, 0)
    const passData = {
      TotalAmount: totalAmountAfterDiscount,
      pinCode: addressResponse.address.pinCode,
      Address: addressResponse.address || params.Address,
      cartId: foundCart._id,
      products: foundCart.products.map(product => ({
        productId: product.productId,
        productSize: product.productSize,
        productColor: product.productColor,
      })),
    }

    const createOrder = await Order.create(passData);

    return {
      status: true,
      statusCode: statusCodes.HTTP_OK,
      message: messages.orderCreated,
      data: createOrder,
    };
    
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

module.exports = { createOrderService }
