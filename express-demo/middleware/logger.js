//Building Custom Middleware Function

function log(req, res, next) {
  console.log("logo...");
  next();
}

module.exports = log;
