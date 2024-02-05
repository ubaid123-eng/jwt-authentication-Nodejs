const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    }

    if (!token) {
      return res.status(401).json({
        message: "Not Authorized, no token provided",
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({
      sucess: false,
      message: `error ${err}`,
    });
  }
};

module.exports = {
  verifyToken,
};
