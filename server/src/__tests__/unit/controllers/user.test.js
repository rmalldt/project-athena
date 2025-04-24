// 1) Mock express-validator so validation always passes
jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockReturnValue({
    isEmpty: () => true,
    errors: []
  })
}));

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const userController = require('../../../controllers/user');
const User           = require('../../../models/User');

// mock response object
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd  = jest.fn();
const mockStatus = jest.fn(() => ({ send: mockSend, json: mockJson, end: mockEnd }));
const mockRes    = { status: mockStatus };

describe('User controller', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  const mockReq = {
    body: {
      username: 'user1',
      email:    'user1@test.com',
      password: 'Password123-'
    }
  };

  describe('register', () => {
    beforeEach(() => {
      // 2) let the code flow past the email/username checks
      jest.spyOn(User, 'getStudentByEmail').mockResolvedValue({ data: null,    message: null });
      jest.spyOn(User, 'getStudentByUsername').mockResolvedValue({ data: null, message: null });
      // 3) mock bcrypt so hashing never fails
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');
    });

    it('should create user with status code 201 upon successful registration', async () => {
      // Arrange: spy on create
      const mockResult = { data: { student_id: 1, username: 'user1' }, message: null };
      jest.spyOn(User, 'create').mockResolvedValue(mockResult);

      // Act
      await userController.register(mockReq, mockRes);

      // Assert
      expect(User.getStudentByEmail).toHaveBeenCalledTimes(1);
      expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data:    mockResult.data,
        message: 'Signup Success'
      });
    });

    it('should return error message with status code 400 when email already exists', async () => {
      jest.spyOn(User, 'getStudentByEmail').mockResolvedValue({ data: {}, message: null });
      await userController.register(mockReq, mockRes);
      expect(User.create).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Email already exists' });
    });

    it('should return error message with status code 400 when username already exists', async () => {
      jest.spyOn(User, 'getStudentByEmail').mockResolvedValue({ data: null,    message: null });
      jest.spyOn(User, 'getStudentByUsername').mockResolvedValue({ data: {}, message: null });
      await userController.register(mockReq, mockRes);
      expect(User.create).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Username already exists' });
    });
  });


});
