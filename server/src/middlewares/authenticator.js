const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticator(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    let result = await User.getStudentByUsername(decoded.username);
    req.user = result.data;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
