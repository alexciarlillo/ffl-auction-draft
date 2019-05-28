const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Token required'
    });
  }
};

module.exports = authJWT;
