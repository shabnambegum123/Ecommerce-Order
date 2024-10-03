module.exports = {
  getProduct: {
    method: "POST",
    url: "http://localhost:5002/get/product",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },
  middleware: {
    method: "POST",
    url: "http://localhost:5000/middleware/api",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },
  updateStock: {
    method: "PUT",
    url: "http://localhost:5002/update/stock",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },
  getAddress:{
    method: "POST",
    url: "http://localhost:5000/get/Address",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },
  getProductLoop:{
    method: "POST",
    url: "http://localhost:5002/get/getProductLoop",
    headers: {
      contentType: "application/json",
    },
    data: {},
  }
}
