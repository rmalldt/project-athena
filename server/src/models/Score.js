const db = require('../db/connect');

class Score {
  constructor({ score_id, user_id, topic_id, score, created_at }) {
    this.scoreId = score_id;
    this.userId = user_id;
    this.topicId = topic_id;
    this.score = score;
    this.createdAt = created_at;
  }

  // Read score by PK
  static async getById(scoreId) {
    const response = await db.query(
      `SELECT score_id, user_id, topic_id, score, created_at FROM score WHERE score_id = $1;`,
      [scoreId]
    );
    if (response.rows.length === 0) return null;
    return new Score(response.rows[0]);
  }

  // Read all scores
  static async getAll() {
    const response = await db.query(
      `SELECT score_id, user_id, topic_id, score, created_at FROM score ORDER BY score_id;`
    );
    return response.rows.map(r => new Score(r));
  }

  // Read all scores for a given user
  static async getAllByUser(userId) {
    const response = await db.query(
      `SELECT score_id, user_id, topic_id, score, created_at FROM score WHERE user_id = $1 ORDER BY score_id;`,
      [userId]
    );
    return response.rows.map(r => new Score(r));
  }

  // Read all scores for a given topic
  static async getAllByTopic(topicId) {
    const response = await db.query(
      `SELECT score_id, user_id, topic_id, score, created_at FROM score WHERE topic_id = $1 ORDER BY score_id;`,
      [topicId]
    );
    return response.rows.map(r => new Score(r));
  }

  // Create a new score record
  static async create({ userId, topicId, score }) {
    const response = await db.query(
      `INSERT INTO score (user_id, topic_id, score, created_at) VALUES ($1, $2, $3, NOW()) RETURNING score_id, user_id, topic_id, score, created_at;`,
      [userId, topicId, score]
    );
    if (response.rows.length !==1) return null;
    return new Score(response.rows[0]);
  }
}

module.exports = Score;
