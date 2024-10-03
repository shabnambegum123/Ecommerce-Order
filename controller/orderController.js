const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");


  const {updateOrderService,getByIdOrderService,deleteOrderService,createOrderService,listOrderService} = require("../service.js/orderService")

  const createOrder = async (req, res) => {
    const params = req.body
   params.userId = req.user._id
   
    const result = await createOrderService(params);
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
  };

  const updateOrder = async (req, res) => {
    const params = req.body;
    params.productId = req.query.productId
    const result = await updateOrderService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  }



  const  getByIdOrder = async (req, res) => {
    
    let params = req.query
   const result = await  getByIdOrderService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  };


  const  deleteOrder = async (req, res) => {
    
    let params = req.query
   const result = await  deleteOrderService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  };

  const  listOrder = async (req, res) => {
    
    let params = req.query
   const result = await  listOrderService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    )                                                                                                                                                                                                                                                                                
  };




  module.exports = {createOrder,updateOrder,getByIdOrder,deleteOrder,listOrder}