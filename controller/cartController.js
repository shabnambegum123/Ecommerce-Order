const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");


  const {createCartService,getCartService,updateCartService} = require("../service.js/cartService")

  const createCart = async (req, res) => {
    const params = req.body
    params.userId = req.user._id
  
    const result = await createCartService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      )
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  }
  const getCart = async (req, res) => {
    const params = req.body
    params.userId = req.user._id
  
    const result = await getCartService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      )
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  }

  const updateCart = async (req, res) => {
    const params = req.body
    params.userId = req.user._id
          
    const result = await updateCartService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      )
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  }
  module.exports = {createCart,getCart,updateCart}