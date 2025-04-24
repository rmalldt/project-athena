const db = require('../db/connect');

class User {
  constructor({ student_id, username, email, password, created_at }) {
    this.student_id = student_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }


  static async getStudentById(id) {
    const response = await db.query(
      'SELECT * FROM student WHERE student_id = $1;',
      [id]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'Student not found' };
    }

    const student = new User(response.rows[0]);
    return { data: student, message: null };
  }


  static async getStudentByUsername(username) {
    const response = await db.query(
      'SELECT * FROM student WHERE LOWER(username) = LOWER($1);',
      [username]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'Student not found' };
    }

    const student = new User(response.rows[0]);
    return { data: student, message: null };
  }


  static async getStudentByEmail(email) {
    const response = await db.query('SELECT * FROM student WHERE email = $1;', [
      email,
    ]);

    if (response.rows.length != 1) {
      return { data: null, message: 'Student not found' };
    }

    const student = new User(response.rows[0]);
    return { data: student, message: null };
  }


  static async create(data) {
    const { username, email, password } = data;

    const response = await db.query(
      'INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING student_id, username, email, password, created_at;',
      [username, email, password]
    );

    if (response.rows.length != 1) {
      return { data: null, message: 'Problem creating new user' };
    }

    return { data: new User(response.rows[0]), message: null };
  }


  static async update(id, data) {
    const { username, email, password } = data;

    const response = await db.query(
      `UPDATE student SET username = $1,email = $2, password = COALESCE($3, password) WHERE student_id = $4 RETURNING student_id, username, email, password, created_at;`,
      [username, email, password, id]
    );

    if (response.rows.length !== 1) {
      return { data: null, message: 'Student not found' };
    }

    const updated = new User(response.rows[0]);
    return { data: updated, message: null };
  }

  
  static async delete(id) {
    const response = await db.query(
      'DELETE FROM student WHERE student_id = $1 RETURNING student_id;',
      [id]
    );

    if (response.rows.length !== 1) {
      return { data: null, message: 'Student not found' };
    }

    return { data: response.rows[0], message: null };
  }

}

module.exports = User;
