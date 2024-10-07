const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { messages } = require("../response/customMessage");
const coupon = require("../Database/modal/coupon");
const mongoose = require('mongoose');

const createCouponCodeService = async (params) => {
  try {
    let Coupon = process.env.coupon;
    let discount = params.discount;
    let passData = {
      couponCode: `${Coupon}${discount}`,
      discount: params.discount,
      productIds: params.productIds,
    };
    let create = await coupon.create(passData);
    if (create) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.sent,
        data: create,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

const updateCouponCodeService = async (params) => {
  try {
    let Coupon = process.env.coupon;
    let discount = params.discount;
    let data = {
        discount:params.discount,
        couponCode:`${Coupon}${discount}`
    }
    
   const updatedCoupon = await coupon.findOneAndUpdate({_id:params.couponId},
      { $set: data}, 
      { new: true } 
    );
    if (updatedCoupon) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.couponUpdate,
        data: [],
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};
const getByIdCouponCodeService = async (params) => {
  try {
    let find= await coupon.findOne({_id:params.couponId});
    if (find) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.sent,
        data: find,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};
const deleteCouponCodeService = async (params) => {

  try {
 let  deleteCoupon = await coupon.findByIdAndUpdate({_id:params.couponId},
    {$set:{isDeleted:true}},
    {new:true}
 );
    if (deleteCoupon) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.deleteCoupon,
        data:[] ,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

module.exports = {
  createCouponCodeService,
  getByIdCouponCodeService,
  deleteCouponCodeService,
  updateCouponCodeService,
};
