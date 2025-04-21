const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

async function register(req, res) {
  const { username, email, password } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.errors.map(error => error.msg);
    return res.status(422).json({ error: errors });
  }

  try {
    let result = await User.getStudentByEmail(email);
    if (result.data) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    result = await User.getStudentByUsername(username);
    if (result.data) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPass = await bcrypt.hash(password, salt);
    result = await User.create({
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

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.errors.map(error => error.msg);
    return res.status(422).json({ error: errors });
  }

  try {
    // Check username
    let result = await User.getStudentByUsername(username);
    if (!result.data) {
      throw new Error(result.message);
    }

    // Check password
    const match = await bcrypt.compare(password, result.data.password);
    if (!match) {
      throw new Error('User could not be authenticated');
    }

    // Issue token

    const payload = {
      student_id: result.data.student_id,
      username: result.data.username,
    };

    const expiresIn = 3600;

    const sendToken = (err, token) => {
      if (err) {
        throw new Error('Error generating token');
      }
      res.status(200).json({
        success: true,
        data: {
          token: token,
          expiresIn: expiresIn,
        },
        message: 'Login Success',
      });
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: expiresIn },
      sendToken
    );
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function logout(req, res) {
  if (!req.user) {
    return res.status(403).json({ error: 'Not Authenticated' });
  }

  delete req.user;
  res.status(200).json({ success: true, message: 'Logout Success' });
}

module.exports = {
  register,
  login,
  logout,
};
