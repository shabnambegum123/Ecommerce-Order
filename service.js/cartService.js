const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { messages } = require("../response/customMessage");
const { getProduct, updateStock } = require("../apiService/internalService");
const cart = require("../Database/modal/cart");
const {generateCouponCode,generateRandomDiscount} = require("../Helpers/couponCode")
const createCartService = async (params) => {
  // try {
  //   let Object = {
  //     productId: params.productId,
  //   };
  //   const axios = await getProduct(Object);

  //   console.log("axios", axios);

  //   if (!axios) {
  //     return {
  //       status: false,
  //       statusCode: statusCodes.HTTP_NOT_FOUND,
  //       message: messages.productNotFound,
  //       data: [],
  //     };
  //   }

  //   let passData = {
  //     productId: axios._id,
  //     productName: axios.productName,
  //     MRP: axios.MRP,
  //     quantity: params.quantity,
  //   };
  //   let cartData = {
  //     products: [passData],
  //     userId: params.userId,
  //     TotalAmount: passData.MRP * params.quantity,
  //   };
  //   if (params.quantity < 1) {
  //     return {
  //       status: false,
  //       statusCode: statusCodes?.HTTP_BAD_REQUEST,
  //       message: messages?.quantity,
  //       data: [],
  //     };
  //   }
  //   // if (axios.stock < params.quantity) {
  //   //   return {
  //   //     status: false,
  //   //     statusCode: statusCodes?.HTTP_BAD_REQUEST,
  //   //     message: messages?.stock,
  //   //     data: [],
  //   //   }
  //   // }
  //   let check = await cart.findOne({ userId: params.userId });
  //   if (!check) {
  //     let createCart = await cart.create(cartData);
  //     if (createCart) {
  //       return {
  //         status: true,
  //         statusCode: statusCodes?.HTTP_OK,
  //         message: messages?.createCart,
  //         data: [],
  //       };
  //     }
  //   }

  //   let data = check.products;
  //   for (let i = 0; i < data.length; i++) {
  //     let totalValue = 0;
  //     if (data[i].productId == params.productId) {
  //       let updateData = data.map((x) => {
  //         if (x.productId == data[i].productId) {
  //           x.quantity += +params.quantity;
  //         }
  //         totalValue += x.MRP * x.quantity;
  //         return x;
  //       });
  //       console.log(updateData, "shabnam begum", totalValue);

  //       let passData = { TotalAmount: totalValue, products: updateData };

  //       const result = await cart.updateOne(
  //         { userId: params.userId },

  //         {
  //           $set: passData,
  //         }
  //       );

  //       if (result) {
  //         let calulate = axios.stock - params.quantity;
  //         let value = {
  //           stock: calulate,
  //           _id: params.productId,
  //         };
  //         let stock = await updateStock(value);
  //         if (stock) {
  //           return {
  //             status: true,
  //             statusCode: statusCodes?.HTTP_OK,
  //             message: messages?.sent,
  //             data: stock,
  //           };
  //         }
  //       }
  //     } else if (data[i].productId !== params.productId) {
  //       let updateData = data.map((x) => {
  //         totalValue += x.MRP * x.quantity;
  //         return x;
  //       });
  //       let passData = { TotalAmount: totalValue, products: updateData };

  //       const result = await cart.updateOne(
  //         { userId: params.userId },

  //         {
  //           $push: products,
  //           $set: passData,
  //         }
  //       );
  //       let calulate = axios.stock - params.quantity;
  //       let value = {
  //         stock: calulate,
  //         _id: params.productId,
  //       };
  //       let stock = await updateStock(value);
  //       if (stock) {
  //         return {
  //           status: true,
  //           statusCode: statusCodes?.HTTP_OK,
  //           message: messages?.sent,
  //           data: stock,
  //         };
  //       }
  //     }
  //   }
  // } catch (error) {
  //   return {
  //     status: false,
  //     statusCode: statusCodes?.HTTP_BAD_REQUEST,
  //     message: error.message,
  //   };
  // }

  try {
    if (params.quantity < 1) {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.quantity,
        data: [],
      };
    }
    let Object = {
      productId: params.productId,
    };
    const axios = await getProduct(Object);
    console.log(axios, 89887);
    if (!axios) {
      return {
        status: false,
        statusCode: statusCodes.HTTP_NOT_FOUND,
        message: messages.productNotFound,
        data: [],
      };
    }

    if (axios.stock < params.quantity) {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.stock,
        data: [],
      };
    }
    let passData = {

      productId: axios._id,
      productName: axios.productName,
      MRP: axios.actualPrice,
      quantity: params.quantity,
      productSize:axios.size,
      productColor:axios.color
    }

   
    let cartData = {
      products: [passData],
      userId: params.userId,
      TotalAmount: passData.MRP * params.quantity,
      couponCode:generateCouponCode(),
      couponCodeDiscount:generateRandomDiscount()

    };

    let checkUserExists = await cart.findOne({ userId: params.userId });
    if (checkUserExists) {
      let data = checkUserExists.products;
      let checkProductId = data.map(async (x) => {
        let TotalAmount = x.MRP * +params.quantity;
        let updatedata = { products: passData, TotalAmount: TotalAmount };
        if (x.productId == params.productId) {
          let updateQuantity = await cart.updateOne(
            { userId: params.userId },

            {
              $set: updatedata,
            }
          );
        } else if (x.productId != params.productId) {
          let totalValue =
            checkUserExists.TotalAmount + passData.MRP * +params.quantity;
          let update = { TotalAmount: totalValue };
          let pustProduct = await cart.updateOne(
            { userId: params.userId },
            {
              $push: { products: passData },
              $set: update,
            }
          );
        }
        return x;
      });
      let calulate = axios.stock - params.quantity;
      let value = {
        stock: calulate,
        _id: params.productId,
      };
      let stock = await updateStock(value);
      if (stock) {
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.sent,
          data: stock,
        };
      }
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.createCart,
        data: [],
      };
    } else {
      let createCart = await cart.create(cartData);
      if (createCart) {
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.createCart,
          data: [],
        };
      }
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

const getCartService = async (params) => {
  let find = await cart.findOne({ userId: params.userId });
  if (!find) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: messages?.cartNotFound,
      data: null,
    };
  }
  let data = find.products;
  let filteredProducts = data.filter((x) => x.isSavedLater === false);
  let TotalAmount = filteredProducts.reduce((acc, x) => {
    return acc + x.MRP * x.quantity;
  }, 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.sent,
    data: {
      products: filteredProducts,
      TotalAmount: TotalAmount,
    },
  };
};

const updateCartService = async (params) => {
  let Object = {
    productId: params.productId,
  };
  const axios = await getProduct(Object);
  let find = await cart.findOne({ userId: params.userId });
  if (params.isSavedLater == true) {
    let value = find.products;
    let updatedata = { isSavedLater: params.isSavedLater };
    let map = value.map(async (x) => {
      let totalAmount = find.TotalAmount - axios.actualPrice;
      if (x.productId == params.productId) {
        var update = await cart.updateOne(
          { userId: params.userId, "products.productId": params.productId },
          {
            $set: {
              "products.$.isSavedLater": updatedata.isSavedLater,
              TotalAmount: totalAmount,
            },
          }
        );
      }

      return x;
    });
  } else if (params.isSavedLater == false) {
    let value = find.products;
    let updatedata = { isSavedLater: params.isSavedLater };
    let map = value.map(async (x) => {
      let totalAmount = find.TotalAmount + axios.actualPrice;

      if (x.productId == params.productId) {
        var update = await cart.updateOne(
          { userId: params.userId, "products.productId": params.productId },
          {
            $set: {
              "products.$.isSavedLater": updatedata.isSavedLater,
              TotalAmount: totalAmount,
            },
          }
        );
      }

      return x;
    });
  }
  if (params.isRemove == true) {
    let value = find.products;
    let map = value.map(async (x) => {
      if (x.productId == params.productId) {
        let totalAmount = find.TotalAmount - axios.actualPrice * x.quantity;

        let update = await cart.updateOne(
          { userId: params.userId },
          {
            $pull: { products: { productId: params.productId } },
            $set: { TotalAmount: totalAmount },
          }
        );
      }
    });
  }
  if (params.reduceQuantity) {
    let checkUserExists = await cart.findOne({ userId: params.userId });

    if (checkUserExists) {
      let matchingProducts = [];
      let data = checkUserExists.products;
      for (let items of data) {
        if (items.productId == params.productId) {
          matchingProducts.push(items);
        }
      }
      if (matchingProducts[0].quantity < params.reduceQuantity) {
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.higher,
          data: [],
        };
      }

      let TotalAmount =
        checkUserExists.TotalAmount - axios.actualPrice * params.reduceQuantity;

      let update = await cart.updateOne(
        { userId: params.userId, "products.productId": params.productId },

        {
          $set: {
            "products.$.quantity": params.reduceQuantity,
            TotalAmount: TotalAmount,
          },
        }
      );
    }
    let calulate = axios.stock + +params.reduceQuantity;
    let value = {
      stock: calulate,
      _id: params.productId,
    };
    let stock = await updateStock(value);
    if (stock) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.sent,
        data: stock,
      };
    }
  }

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.updatedCart,
    data: [],
  };
};

module.exports = { createCartService, getCartService, updateCartService };
