const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { messages } = require("../response/customMessage");
const { getProduct, updateStock } = require("../apiService/internalService");
const cart = require("../Database/modal/cart");

const createCartService = async (params) => {
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
    if (params.productColor) {
      let color = params.productColor;
      let checkColor = axios.color.includes(color);
      if (!checkColor) {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_NOT_FOUND,
          message: messages?.color,
          data: [],
        };
      }
    }
    if (params.productSize) {
      let size = params.productSize;
      let checkSize = axios.size.includes(size);
      if (!checkSize) {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_NOT_FOUND,
          message: messages?.size,
          data: [],
        };
      }
    }

    let passData = {
      productId: axios._id,
      productName: axios.productName,
      MRP: axios.actualPrice,
      quantity: params.quantity,
      productSize: params.productSize || axios.DefaultSize,
      productColor: params.productColor || axios.DefaultColor,
    };

    let cartData = {
      products: [passData],
      userId: params.userId,
      TotalAmount: passData.MRP * params.quantity,
    };

    let checkUserExists = await cart.findOne({ userId: params.userId });
    if (checkUserExists) {
      let data = checkUserExists.products;

      const product = data.find((x) => x.productId.equals(params.productId));
      if (product) {
        const sizeMatch = product.productSize === params.productSize;
        const colorMatch = product.productColor === params.productColor;
        if (sizeMatch && colorMatch) {
          let quantity = product.quantity + Number(params.quantity);
          let updateValue = {
            quantity: quantity,
            TotalAmount:
              checkUserExists.TotalAmount + product.MRP * +params.quantity,
          };
          let update = await cart.findOneAndUpdate(
            { userId: params.userId, "products.productId": params.productId },
            {
              $set: {
                "products.$.quantity": updateValue.quantity,
                TotalAmount: updateValue.TotalAmount,
              },
            }
          );
          if (update) {
            return {
              status: true,
              statusCode: statusCodes?.HTTP_OK,
              message: messages?.update,
              data: [],
            };
          }
        } else {
          console.log(passData.MRP);
          let pustProduct = await cart.updateOne(
            { userId: params.userId },
            {
              $push: { products: passData },
              $set: {
                TotalAmount:
                  checkUserExists.TotalAmount + passData.MRP * +params.quantity,
              },
            }
          );
          if (pustProduct) {
            return {
              status: true,
              statusCode: statusCodes?.HTTP_OK,
              message: messages?.update,
              data: [],
            };
          }
        }
      } else {
        let differenrProduct = await cart.updateOne(
          { userId: params.userId },
          {
            $push: { products: passData },
            $set: {
              TotalAmount:
                checkUserExists.TotalAmount + axios.MRP * +params.quantity,
            },
          }
        );
        if (differenrProduct) {
          return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            message: messages?.update,
            data: [],
          };
        }
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
      }
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
    for (let x of value) {
      if (x.productId.equals(params.productId)) {
        if (x.isSavedLater === true) {
          return {
            status: false,
            statusCode: statusCodes?.HTTP_BAD_REQUEST,
            message: messages?.savedForLater,
            data: [],
          };
        }
      }

      let totalAmount = find.TotalAmount - axios.actualPrice;
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
  } else if (params.isSavedLater == false) {
    let value = find.products;
    let updatedata = { isSavedLater: params.isSavedLater };
    for(let x of value){
      let totalAmount = find.TotalAmount + axios.actualPrice;
        if(x.productId.equals(params.productId)){
          if (x.isSavedLater === false) {
            return {
              status: false,
              statusCode: statusCodes?.HTTP_BAD_REQUEST,
              message: messages?.saved,
              data: [],
            };
          }
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
    }
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
      let matchingProducts = []
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
