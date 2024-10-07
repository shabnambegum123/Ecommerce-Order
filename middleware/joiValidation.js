
const { joierrors } = require("../response/response");
const joi = require("joi");
const createCouponValidation = async (req, res, next) => {
  try {
    const profileValidate = joi.object({
      discount: joi.number().required().messages({
        "string.empty": "discount is required.",
        "any.required": "discount is required.",
      }),
      productIds: joi.array().required().messages({
        "string.empty": "productIds is required.",
        "any.required": "productIds is required.",
      }),
    });

    const options = {
      abortEarly: false,
      convert: true,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = profileValidate.validate(req.body, options);

    if (error) {
      return joierrors(req, res, 400, "Validation error", error);
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
}

const updateCouponValidation = async (req, res, next) => {
    try {
      const profileValidate = joi.object({
        discount: joi.number().optional().messages({
          "string.empty": "discount is required.",
          "any.required": "discount is required.",
        }),
        productIds: joi.array().optional().messages({
          "string.empty": "productIds is required.",
          "any.required": "productIds is required.",
        }),
        couponId: joi.string().required().messages({
            "string.empty": "couponId is required.",
            "any.required": "couponId is required.",
          })
      });
  
      const options = {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      };
  
      const { error, value } = profileValidate.validate(req.body, options);
  
      if (error) {
        return joierrors(req, res, 400, "Validation error", error);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      });
    }
  }
  const getByIdCouponValidation = async (req, res, next) => {
    try {
      const profileValidate = joi.object({
        couponId: joi.string().required().messages({
          "string.empty": "couponId is required.",
          "any.required": "couponId is required.",
        })
      });
  
      const options = {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      };
  
      const { error, value } = profileValidate.validate(req.body, options);
  
      if (error) {
        return joierrors(req, res, 400, "Validation error", error);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      });
    }
  }
  const deleteCouponValidation = async (req, res, next) => {
    try {
      const profileValidate = joi.object({
        carId: joi.string().required().messages({
            "string.empty": "carId is required.",
            "any.required": "carId is required.",
          })
      });
  
      const options = {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      };
  
      const { error, value } = profileValidate.validate(req.body, options);
  
      if (error) {
        return joierrors(req, res, 400, "Validation error", error);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      });
    }
  }

  const createCartValidation = async (req, res, next) => {
    try {
      const profileValidate = joi.object({
        productId: joi.string().required().messages({
          "string.empty": "productId is required.",
          "any.required": "productId is required.",
        }),
        quantity: joi.string().required().messages({
          "string.empty": "quantity is required.",
          "any.required": "quantity is required.",
        }),
        productSize: joi.string().required().messages({
            "string.empty": "productSize is required.",
            "any.required": "productSize is required.",
          }),
          productColor: joi.string().required().messages({
            "string.empty": "productColor is required.",
            "any.required": "productColor is required.",
          })
      });
  
      const options = {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      };
  
      const { error, value } = profileValidate.validate(req.body, options);
  
      if (error) {
        return joierrors(req, res, 400, "Validation error", error);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      });
    }
  }


  const updateCartValidation = async (req, res, next) => {
    try {
      const profileValidate = joi.object({
        isSavedLater: joi.boolean().optional().messages({
          "string.empty": "isSavedLater is required.",
          "any.required": "isSavedLater is required.",
        }),
        isRemove: joi.boolean().optional().messages({
          "string.empty": "isRemove is required.",
          "any.required": "isRemove is required.",
        }),
        productId: joi.string().optional().messages({
            "string.empty": "productId is required.",
            "any.required": "productId is required.",
          }),
          reduceQuantity: joi.number().optional().messages({
            "string.empty": "reduceQuantity is required.",
            "any.required": "reduceQuantity is required.",
          })
      })
      const options = {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      };
  
      const { error, value } = profileValidate.validate(req.body, options);
  
      if (error) {
        return joierrors(req, res, 400, "Validation error", error);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      })
    }
  }

module.exports = {createCouponValidation,deleteCouponValidation,getByIdCouponValidation,updateCouponValidation,createCartValidation,updateCartValidation}