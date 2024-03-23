const jwt = require("jsonwebtoken");
const { admin } = require("../firebase/config");

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res.status(401).json({
      status_code: 401,
      message: "Not authorized1",
    });
  }

  const bearer = accessToken.split(" ");
  const token = bearer[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.sub) {
      req.data = {
        user_id: decoded.sub,
      };
      return next();
    }
    return res.status(401).json({
      status_code: 401,
      message: "Not authorized2",
    });
  } catch (error) {
    return res.status(401).json({
      status_code: 401,
      message: "Not authorized3",
    });
  }
};

module.exports = verifyToken;
