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
    }
  },
};

module.exports = { routes };
