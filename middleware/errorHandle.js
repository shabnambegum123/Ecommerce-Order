const errHandle = (req, res, err, next) => {
    console.log("advqavd", req);
    let statusCode = 500;
    if (err && err.error) {
      statusCode = 400;
      let error = err.error.details.reduce((prev, curr) => {
        prev[curr.path[0]] = curr.message.replace(/"/g, "");
        return prev;
      }, {});
      let msg = Object.values(error).join(", ");
      err.message = msg;
    } else if (err && err.status) {
      statusCode = err.status;
    }
    return res.status(400).json({
      status: 400,
      message: err?.message || "Something went wrong",
    });
  };
  
  module.exports = { errHandle };
  