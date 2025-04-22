const db = require('../db/connect');

class Topic {
  constructor({ topic_id, title, description, video_url }) {
    this.topicId     = topic_id;
    this.title       = title;
    this.description = description;
    this.videoUrl    = video_url;
  }

  static async getById(topicId) {
    const { rows } = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic WHERE topic_id = $1;`,
      [topicId]
    );
    if (rows.length === 0) return null;
    return new Topic(rows[0]);
  }

  static async getAll() {
    const { rows } = await db.query(
      `SELECT topic_id, title, description, video_urlFROM topic ORDER BY topic_id;`
    );
    return rows.map(r => new Topic(r));
  }

  static async create({ title, description, videoUrl }) {
    const { rows } = await db.query(
      `INSERT INTO topic (title, description, video_url) VALUES ($1, $2, $3) RETURNING topic_id, title, description, video_url;`,
      [title, description, videoUrl]
    );
    return new Topic(rows[0]);
  }
}

module.exports = Topic;
