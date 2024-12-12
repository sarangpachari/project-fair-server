const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("INSIDE JWT MIDDLEWARE");

  //LOGIC FOR AUTHORIZE USER
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  if (token) {
    //VERIFY
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
      console.log(jwtResponse);
      req.userId = jwtResponse.userId;
      next();
    } catch (error) {
      res.status(401).json("Authorisation Failed ! Please login");
    }
  } else {
    res.status(404).json("Authorisation Failed ! Token : Missing Status");
  }
};

module.exports = jwtMiddleware;
