const db = require('../db/connect');

class Topic {
  constructor({ topic_id, student_id, video_url }) {
    this.topicId   = topic_id;
    this.studentId = student_id;
    this.videoUrl  = video_url;
  }

  
  static async getById(topicId) {
    const { rows } = await db.query(
      `SELECT topic_id, student_id, video_url FROM topic WHERE topic_id = $1;`,
      [topicId]
    );

    if (rows.length === 0) return null;
    return new Topic(rows[0]);
  }
  
  static async getAllByStudent(studentId) {
    const { rows } = await db.query(
      `SELECT topic_id, student_id, video_url FROM topic WHERE student_id = $1 ORDER BY topic_id;`,
      [studentId]
    );
    return rows.map(row => new Topic(row));
  }

  
  static async create({ studentId, videoUrl }) {
    const { rows } = await db.query(
      `INSERT INTO topic (student_id, video_url) VALUES ($1, $2) RETURNING topic_id, student_id, video_url;`,
      [studentId, videoUrl]
    );
    return new Topic(rows[0]);
  }
}

module.exports = Topic;
