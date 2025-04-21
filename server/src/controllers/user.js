const { validationResult } = require('express-validator');
const {
  hashPassword,
  comparePassword,
  issueJwt,
} = require('../utils/auth-util');

const User = require('../models/User');

async function register(req, res) {
  const { username, email, password } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.errors.map(error => error.msg);
    return res.status(422).json({ error: errors });
  }

  try {
    let result = await User.getOneByEmail(email);
    if (result.data) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    result = await User.getOneByUsername(username);
    if (result.data) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPass = await hashPassword(password);
    result = await User.createUser({
      username,
      email,
      password: hashedPass,
    });
    if (!result.data) {
      throw new Error(result.message);
    }
    res
      .status(201)
      .json({ success: true, data: result.data, message: 'Signup Success' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Check username
    let result = await User.getOneByUsername(username);
    console.log('RESULT: ', result.data);
    if (!result.data) {
      throw new Error(result.message);
    }

    // Check password
    const match = await comparePassword(password, result.data.password);
    if (!match) {
      throw new Error('User could not be authenticated');
    }

    // Issue token
    const jwt = issueJwt(result.data);

    res.status(200).json({
      success: true,
      data: {
        token: jwt.token,
        expiresIn: jwt.expiresIn,
      },
      message: 'Login Success',
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
};
