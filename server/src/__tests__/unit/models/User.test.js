const User = require('../../../models/User');
const db = require('../../../db/connect');

describe('User', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  const mockUser = {
    student_id: 1,
    username: 'jim',
    email: 'jim@student.com',
    password: 'Password123-',
    created_at: '2025-04-21T20:27:42.882Z',
  };

  describe('getStudentById', () => {
    it('resolves with User on successful db query', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

      // Act
      const result = await User.getStudentById(mockUser.student_id);

      // Assert
      expect(result.data).toBeInstanceOf(User);
      expect(result.data.username).toBe(mockUser.username);
      expect(result.data.student_id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE student_id = $1;',
        [mockUser.student_id]
      );
    });

    it('resolves with NULL data when User is not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      const result = await User.getStudentById(999);

      expect(result.data).toBe(null);
      expect(result.message).toBe('Student not found');
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE student_id = $1;',
        [999]
      );
    });
  });

  describe('getStudentByUsername', () => {
    it('resolves with User on successful db query', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

      // Act
      const result = await User.getStudentByUsername(mockUser.username);

      // Assert
      expect(result.data).toBeInstanceOf(User);
      expect(result.data.username).toBe(mockUser.username);
      expect(result.data.student_id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE LOWER(username) = LOWER($1);',
        [mockUser.username]
      );
    });

    it('resolves with NULL data when User is not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      const result = await User.getStudentByUsername('No Name');

      expect(result.data).toBe(null);
      expect(result.message).toBe('Student not found');
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE LOWER(username) = LOWER($1);',
        ['No Name']
      );
    });
  });

  describe('getStudentByEmail', () => {
    it('resolves with User on successful db query', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

      // Act
      const result = await User.getStudentByEmail(mockUser.email);

      // Assert
      expect(result.data).toBeInstanceOf(User);
      expect(result.data.email).toBe(mockUser.email);
      expect(result.data.student_id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE email = $1;',
        [mockUser.email]
      );
    });

    it('resolves with NULL data when User is not found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      const result = await User.getStudentByEmail('No Email');

      expect(result.data).toBe(null);
      expect(result.message).toBe('Student not found');
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM student WHERE email = $1;',
        ['No Email']
      );
    });
  });

  describe('create', () => {
    it('resolves with student_id and username on successful creation', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

      const result = await User.create(mockUser);

      expect(result.data).toHaveProperty('student_id', mockUser.student_id);
      expect(result.data).toHaveProperty('username', mockUser.username);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING student_id, username;',
        [mockUser.username, mockUser.email, mockUser.password]
      );
    });

    it('resolves with NULL data when User is not created', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      const result = await User.create(mockUser);

      expect(result.data).toBe(null);
      expect(result.message).toBe('Problem creating new user');
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING student_id, username;',
        [mockUser.username, mockUser.email, mockUser.password]
      );
    });
  });
});
