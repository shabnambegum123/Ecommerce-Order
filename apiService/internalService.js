let { InternalAPIs } = require("../config/index");
let { Rest } = require("../restCalls/index");

const getProduct = async (data) => {
  try {
    let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.getProduct));

    urlPayload.data = {
      data: data,
    };

    let response = await Rest.callApi(urlPayload);

    return response.data;
  } catch (err) {
    console.log(">>>>>>", err);
    throw new Error(err);
  }
};
const middleware= async (data) => {
    try {
      let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.middleware));
  
      urlPayload.data = {
        data: data,
      };
  
      let response = await Rest.callApi(urlPayload);
  
      return response.data;
    } catch (err) {
      console.log(">>>>>>", err);
      throw new Error(err);
    }
  };
  const updateStock= async (data) => {
    try {
      let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.updateStock));
  
      urlPayload.data = {
        data: data,
      };
  
      let response = await Rest.callApi(urlPayload);
  
      return response.data;
    } catch (err) {
      console.log(">>>>>>", err);
      throw new Error(err);
    }
  };

  const getAddress= async (data) => {
    try {
      let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.getAddress));
  
      urlPayload.data = {
        data: data,
      };
  
      let response = await Rest.callApi(urlPayload);
  
      return response.data;
    } catch (err) {
      console.log(">>>>>>", err);
      throw new Error(err);
    }
  };


  const getProductLoop= async (data) => {
    try {
      let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.getProductLoop));
  
      urlPayload.data = {
        data: data,
      };
  
      let response = await Rest.callApi(urlPayload);
  
      return response.data;
    } catch (err) {
      console.log(">>>>>>", err);
      throw new Error(err);
    }
  };
module.exports = { getProduct ,middleware,updateStock,getAddress,getProductLoop};
