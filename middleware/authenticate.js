const jwt = require("jsonwebtoken");
const { statusCodes } = require("../response/httpStatusCode");
const { messages } = require("../response/customMessage");
const { middleware } = require("../apiService/internalService");
const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers["Authorization"] ||
      req.headers["x-access-token"] ||
      req.headers["authorization"];

    if (!token) {
      return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
        status: statusCodes.HTTP_UNAUTHORIZED,
        message: messages?.tokenEmpty,
        data: [],
      });
    }

    const decoded = jwt.verify(
      token.replace("Bearer", ""),
      process.env.secretKey
    );

    if (decoded._id) {
      let mailObject = {
        EmailId: decoded.EmailId,
        role: decoded.role,
        _id: decoded._id,
      };
      const axios = await middleware(mailObject);
      if (axios._id == decoded._id) {
        if (!axios.isActive) {
          return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
            status: statusCodes.HTTP_UNAUTHORIZED,
            message: messages.userInactive,
            data: [],
          });
        }
        req.user = axios;
        next();
      } else {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages.tokenInvalid,
          data: [],
        });
      }
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
      status: statusCodes.HTTP_UNAUTHORIZED,
      message: messages.tokenInvalid,
      data: [],
    });
  }
};
const verifyRole =
  (roles = []) =>
  async (req, res, next) => {
    try {
      const token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["Authorization"];

      if (!token) {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages?.tokenEmpty,
          data: [],
        });
      }

      const decodedToken = jwt.verify(token, process.env.secretKey);
        
      if (roles.includes(decodedToken.role)) {
        return next();
      } else {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages.tokenInvalid,
          data: [],
        });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
        status: statusCodes.HTTP_UNAUTHORIZED,
        message: messages.tokenInvalid,
        data: [],
      });
    }
  };

module.exports = { verifyRole, verifyToken };
