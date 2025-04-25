const db = require('../db/connect');

class Score {
  constructor({ score_id, student_id, topic_id, score }) {
    this.scoreId = score_id;
    this.userId = student_id;
    this.topicId = topic_id;
    this.score = score;
  }

  // Read score by PK
  static async getById(scoreId) {
    const response = await db.query(
      `SELECT * FROM score WHERE score_id = $1;`,
      [scoreId]
    );
    if (response.rows.length === 0) return null;
    return new Score(response.rows[0]);
  }

  // Read all scores
  static async getAll() {
    const response = await db.query(`SELECT * FROM score ORDER BY score_id;`);
    return response.rows.map(r => new Score(r));
  }

  // Read all scores for a given user
  static async getAllByUser(userId) {
    const response = await db.query(
      `SELECT * FROM score WHERE student_id = $1 ORDER BY score_id;`,
      [userId]
    );
    return response.rows.map(r => new Score(r));
  }

  // Read all scores for a given topic
  static async getAllByTopic(topicId) {
    const response = await db.query(
      `SELECT * FROM score WHERE topic_id = $1 ORDER BY score_id;`,
      [topicId]
    );
    return response.rows.map(r => new Score(r));
  }

  // Create a new score record
  static async create(userId, topicId, score) {
    console.log('MODEL: ', userId, topicId, score);
    const response = await db.query(
      `INSERT INTO score (score, student_id, topic_id) VALUES ($1, $2, $3) RETURNING *;`,
      [score, userId, topicId]
    );
    if (response.rows.length !== 1) return null;
    return new Score(response.rows[0]);
  }

  async update(userId, topicId, newScore) {
    const response = await db.query(
      'UPDATE score SET score = $1 WHERE student_id = $2 AND topic_id = $3;',
      [this.score + newScore, userId, topicId]
    );

    if (response.rows.length != 1) {
      return null;
    }

    return new Score(response.rows[0]);
  }
}

module.exports = Score;
