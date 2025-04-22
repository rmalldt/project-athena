const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../../../controllers/user');
const User = require('../../../models/User');

// Mocking response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe('User controller', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  const mockReq = {
    body: {
      username: 'user1',
      email: 'user1@test.com',
      password: 'Password123-',
    },
  };

  describe('register', () => {
    it('should create user with status code 201 upon successful registration', async () => {
      // Arrange
      const mockResult = {
        data: {
          student_id: 1,
          username: 'user1',
        },
        message: null,
      };

      jest.spyOn(User, 'create').mockResolvedValue(mockResult);

      // Act
      await userController.register(mockReq, mockRes);

      expect(User.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: mockResult.data,
        message: 'Signup Success',
      });
    });

    it('should return error message with status code 400 when email already exists', async () => {
      const mockResult = {
        data: {
          student_id: 1,
          username: 'user1',
          email: 'user1@test.com',
          password: 'Password123-',
          created_at: '2025-04-21T20:27:42.882Z',
        },
        message: null,
      };

      jest.spyOn(User, 'getStudentByEmail').mockResolvedValue(mockResult);

      await userController.register(mockReq, mockRes);

      expect(User.create).toHaveBeenCalledTimes(0);
      expect(User.getStudentByEmail).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Email already exists',
      });
    });

    it('should return error message with status code 400 when username already exists', async () => {
      const mockResult = {
        data: {
          student_id: 1,
          username: 'user1',
          email: 'user1@test.com',
          password: 'Password123-',
          created_at: '2025-04-21T20:27:42.882Z',
        },
        message: null,
      };

      jest.spyOn(User, 'getStudentByEmail').mockResolvedValue([]);
      jest.spyOn(User, 'getStudentByUsername').mockResolvedValue(mockResult);

      await userController.register(mockReq, mockRes);

      expect(User.create).toHaveBeenCalledTimes(0);
      expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Username already exists',
      });
    });
  });

  describe('login', () => {
    it('should return toke with status code 200 upon successful login', async () => {
      const mockResult = {
        data: {
          student_id: 1,
          username: 'user1',
          email: 'user1@test.com',
          password: 'Password123-',
          created_at: '2025-04-21T20:27:42.882Z',
        },
        message: null,
      };

      const token = 'jwt-token';
      const expiresIn = 3600;
      const data = {
        token,
        expiresIn,
      };

      jest.spyOn(User, 'getStudentByUsername').mockResolvedValue(mockResult);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockReturnValue(token);

      await userController.login(mockReq, mockRes);

      expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: data,
        message: 'Login Success',
      });
    });
  });

  it('should return error message with status code 401 when username is not found', async () => {
    const mockResult = {
      data: null,
      message: 'Student not found',
    };

    jest.spyOn(User, 'getStudentByUsername').mockResolvedValue(mockResult);

    await userController.login(mockReq, mockRes);

    expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Student not found',
    });
  });

  it('should return error message with status code 401 when password do not match', async () => {
    const mockResult = {
      data: {
        student_id: 1,
        username: 'user1',
        email: 'user1@test.com',
        password: 'Password123-',
        created_at: '2025-04-21T20:27:42.882Z',
      },
      message: null,
    };

    jest.spyOn(User, 'getStudentByUsername').mockResolvedValue(mockResult);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    await userController.login(mockReq, mockRes);

    expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'User could not be authenticated',
    });
  });

  it('should return error message with status code 401 when token generation error occurs', async () => {
    const mockResult = {
      data: {
        student_id: 1,
        username: 'user1',
        email: 'user1@test.com',
        password: 'Password123-',
        created_at: '2025-04-21T20:27:42.882Z',
      },
      message: null,
    };

    jest.spyOn(User, 'getStudentByUsername').mockResolvedValue(mockResult);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue(null);

    await userController.login(mockReq, mockRes);

    expect(User.getStudentByUsername).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Error generating token',
    });
  });
});
