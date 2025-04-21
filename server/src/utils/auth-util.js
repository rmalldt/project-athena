const brcypt = require('brcypt');
const jwt = require('jsonwebtoken');

async function hashPassword(pass) {
  const salt = await brcypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
  return await brcypt.hash(pass, salt);
}

async function comparePassword(plain, hashed) {
  return await brcypt.compare(plain, hashed);
}

function issueJwt(user) {
  const payload = { user_id: user.user_id, username: user.username };
  const expiresIn = '1h';
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });
  return {
    token,
    expiresIn,
  };
}

function vertifyJwt(token) {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}

module.exports = {
  hashPassword,
  comparePassword,
  issueJwt,
  vertifyJwt,
};
