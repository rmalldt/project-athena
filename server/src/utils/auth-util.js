const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(pass) {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  return await bcrypt.hash(pass, salt);
}

async function comparePassword(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}

function issueJwt(user) {
  const payload = { username: user.username };
  const expiresIn = '1h';
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });
  return {
    token,
    expiresIn,
  };
}

function verifyJwt(token) {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}

module.exports = {
  hashPassword,
  comparePassword,
  issueJwt,
  verifyJwt,
};
