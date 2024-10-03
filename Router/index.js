const router = require("express").Router();
const { routes } = require("../routes/endPoint");
const { errHandle } = require("../middleware/errorHandle");
const {createOrder,updateOrder,getByIdOrder,deleteOrder,listOrder} = require("../controller/orderController")
const {createCart,getCart,updateCart} = require("../controller/cartController")
const { verifyToken, verifyRole } = require("../middleware/authenticate");

// ORDER
router.post(routes.v1.order.createOrder,  [verifyToken, verifyRole(["admin","user"])],createOrder)
router.put(routes.v1.order.updateOrder, updateOrder)
router.get(routes.v1.order.getByIdOrder, getByIdOrder)
router.delete(routes.v1.order.deleteOrder, deleteOrder)
router.get(routes.v1.order.listOrder, listOrder)

// cart

router.post(routes.v1.cart.createCart, [verifyToken, verifyRole(["admin"])], createCart)
router.get(routes.v1.cart.getCart, [verifyToken, verifyRole(["admin"])], getCart)
router.put(routes.v1.cart.updateCart, [verifyToken, verifyRole(["admin"])], updateCart)

router.use(errHandle)
module.exports = router