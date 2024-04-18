const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      req.userId = decoded.userId;
      next();
    });
};
  

module.exports = verifyToken;
