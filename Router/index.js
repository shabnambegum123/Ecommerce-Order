const router = require("express").Router();
const { routes } = require("../routes/endPoint");
const { errHandle } = require("../middleware/errorHandle");
const {createOrder,updateOrder,getByIdOrder,deleteOrder,listOrder} = require("../controller/orderController")
const {createCart,getCart,updateCart} = require("../controller/cartController")
const { verifyToken, verifyRole } = require("../middleware/authenticate");
const {createCouponCode,updateCouponCode,deleteCouponCode, getByIdCouponCode}= require("../controller/couponcodeController")
const {createCouponValidation,deleteCouponValidation,getByIdCouponValidation,updateCouponValidation,createCartValidation,updateCartValidation} = require("../middleware/joiValidation")

// ORDER
router.post(routes.v1.order.createOrder,  [verifyToken, verifyRole(["admin","user"])],createOrder)
router.put(routes.v1.order.updateOrder, updateOrder)
router.get(routes.v1.order.getByIdOrder, getByIdOrder)
router.delete(routes.v1.order.deleteOrder, deleteOrder)
router.get(routes.v1.order.listOrder, listOrder)

// cart
router.post(routes.v1.cart.createCart, [verifyToken, verifyRole(["admin"]),createCartValidation], createCart)
router.get(routes.v1.cart.getCart, [verifyToken, verifyRole(["admin"])], getCart)
router.put(routes.v1.cart.updateCart, [verifyToken, verifyRole(["admin"]),updateCartValidation], updateCart)


//couponCode
router.post(routes.v1.couponCode.createCoupon, [verifyToken, verifyRole(["admin"]),createCouponValidation], createCouponCode)
router.put(routes.v1.couponCode.updateCoupon, [verifyToken, verifyRole(["admin"]),updateCouponValidation], updateCouponCode)
router.delete(routes.v1.couponCode.deleteCoupon, [verifyToken, verifyRole(["admin"]),deleteCouponValidation], deleteCouponCode)
router.get(routes.v1.couponCode.getByIdCoupon, [verifyToken, verifyRole(["admin"]),getByIdCouponValidation], getByIdCouponCode)
router.use(errHandle)
module.exports = router

