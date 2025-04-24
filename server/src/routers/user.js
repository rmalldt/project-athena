const { Router } = require('express');
const { body } = require('express-validator');
const authenticateJWT = require('../middlewares/auth');
const { ensureSelfOrTeacher } = require('../middlewares/authorize');
const userController = require('../controllers/user');
const userRouter = Router();


// Registration
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

// Login
userRouter.post('/login',
  [
    body('username', 'Invalid username').trim().not().isEmpty(),
    body('password', 'Invalid password.').isLength({ min: 8 }).trim(),
  ],
  userController.login
);

// Logout
userRouter.delete('/logout', userController.logout);


// Update profile
userRouter.put(
  '/:id', authenticateJWT, 
  [
    body('email').optional().isEmail().withMessage('Invalid email').normalizeEmail(),
    body('username').optional().trim().notEmpty().withMessage('Username cannot be empty'),
    body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must include lowercase, uppercase, number and symbol')
    .trim()
  ],
  userController.updateProfile
);

// Delete user
userRouter.delete('/:id', authenticateJWT, userController.removeUser);

module.exports = userRouter;
