const db = require('../db/connect');

class Topic {
  constructor({ topic_id, title, description, video_url }) {
    this.topicId = topic_id;
    this.title = title;
    this.description = description;
    this.videoUrl = video_url;
  }

  // Fetch a topic by its primary key
  static async getById(topicId) {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic WHERE topic_id = $1;`,
      [topicId]
    );

    if (response.rows.length === 0) return null;
    return new Topic(response.rows[0]);
  }

  // Fetch all topics,sorted by ID
  static async getAll() {
    const response = await db.query(
      `SELECT topic_id, title, description, video_url FROM topic ORDER BY topic_id;`
    );

    return response.rows.map(r => new Topic(r));
  }
  
}

module.exports = Topic;

