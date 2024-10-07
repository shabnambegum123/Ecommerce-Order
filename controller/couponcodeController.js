const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");

const{createCouponCodeService,getByIdCouponCodeService,deleteCouponCodeService,updateCouponCodeService}= require("../service.js/couponCodeService")
  const createCouponCode = async (req, res) => {
    const params = req.body
   params.userId = req.user._id
   
    const result = await createCouponCodeService(params);
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

  const updateCouponCode = async (req, res) => {
    const params = req.body
   params.userId = req.user._id
   
    const result = await updateCouponCodeService(params);
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
  const deleteCouponCode = async (req, res) => {
    const params = req.body
   params.userId = req.user._id
   
    const result = await deleteCouponCodeService(params);
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
  const getByIdCouponCode = async (req, res) => {
    const params = req.body
   params.userId = req.user._id
    const result = await getByIdCouponCodeService(params);
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




  module.exports = {createCouponCode,updateCouponCode,deleteCouponCode, getByIdCouponCode}