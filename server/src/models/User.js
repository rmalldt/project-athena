const db = require('../db/connect');

class User {
  constructor({ user_id, username, email, password, created_at }) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM user_account WHERE user_id = $1',
      [id]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'User not found' };
    }

    const user = new User(response.rows[0]);
    return { data: user, message: null };
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      'SELECT * FROM user_account WHERE username = $1',
      [username]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'User not found' };
    }

    const user = new User(response.rows[0]);
    return { data: user, message: null };
  }

  static async getOneByEmail(email) {
    const response = await db.query(
      'SELECT * FROM user_account WHERE email = $1',
      [email]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'User not found' };
    }

    const user = new User(response.rows[0]);
    return { data: user, message: null };
  }

  static async createUser(data) {
    const { username, email, password } = data;

    const response = await db.query(
      'INSERT INTO user_account (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username',
      [username, email, password]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'Problem creating new user' };
    }

    return { data: response.rows[0], message: null };
  }
}

module.exports = User;
