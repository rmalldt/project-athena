const { Router } = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');

const userRouter = Router();

userRouter.post(
  '/register',
  [
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('username', 'Invalid username').trim().not().isEmpty(),
    body(
      'password',
      'Please enter a password with at least 8 characters containing atleast 1 lowercase, uppercase, numbers and symbols.'
    )
      .isLength({ min: 8 })
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .trim(),
  ],
  userController.register
);

userRouter.post(
  '/login',
  [
    body('username', 'Invalid username').trim().not().isEmpty(),
    body('password', 'Invalid password.').isLength({ min: 8 }).trim(),
  ],
  userController.login
);

userRouter.delete('/logout', userController.logout);

module.exports = userRouter;
