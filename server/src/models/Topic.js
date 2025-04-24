const db = require('../db/connect');

class Topic {
  constructor({ topic_id, title, description, video_url }) {
    this.topicId = topic_id;
    this.title = title;
    this.description = description;
    this.videoUrl = video_url;
  }

  static async getById(topicId) {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic WHERE topic_id = $1;`,
      [topicId]
    );

    if (response.rows.length === 0) return null;
    return new Topic(response.rows[0]);
  }

  static async getAll() {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic ORDER BY topic_id;`
    );

    return response.rows.map(r => new Topic(r));
  }

  static async getByTitle(substr) {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic WHERE title ILIKE '%' || $1 || '%' ORDER BY topic_id;`,
      [substr]
    );

    return response.rows.map(r => new Topic(r));
  }

  static async getByDescription(substr) {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic WHERE description ILIKE '%' || $1 || '%' ORDER BY topic_id;`,
      [substr]
    );

    return response.rows.map(r => new Topic(r));
  }

  static async create({ title, description, videoUrl }) {
    const response = await db.query(
      `INSERT INTO topic (title, description, video_url) VALUES ($1, $2, $3) RETURNING topic_id, title, description, video_url;`,
      [title, description, videoUrl]
    );

    return new Topic(response.rows[0]);
  }
}

module.exports = Topic;

