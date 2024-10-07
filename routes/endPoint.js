const routes = {
  v1: {
    order: {
      createOrder: "/v1/create/order",
      updateOrder: "/v1/update/order",
      listOrder: "/v1/list/order",
      getByIdOrder: "/v1/getById/order",
      deleteOrder: "/v1/delete/order",
    },
    cart:{
        createCart:"/v1/create/cart",
        getCart:"/v1/get/cart",
        updateCart:"/v1/update/Cart"
    },
    couponCode:{
      createCoupon:"/v1/create/coupon",
      updateCoupon: "/v1/update/Coupon",
      listCoupon: "/v1/list/Coupon",
      getByIdCoupon: "/v1/getById/Coupon",
      deleteCoupon: "/v1/delete/Coupon"
    }
  },
};

module.exports = { routes };
