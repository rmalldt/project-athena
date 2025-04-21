const User = require('../models/User');
const { verifyJwt } = require('../utils/auth-util');

async function authenticator(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    res.status(403).json({ error: 'Missing token' });
  }

  try {
    const decoded = verifyJwt(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    let result = await User.getOneByUsername(decoded.username);
    req.user = result.data;
    console.log('User: ', req.user);
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
