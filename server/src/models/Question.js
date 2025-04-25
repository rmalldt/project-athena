const db = require('../db/connect');

class Question {
  constructor({ question_id, topic_id, question, answer, options }) {
    this.questionId = question_id;
    this.topicId = topic_id;
    this.question = question;
    this.answer = answer;
    this.options = options;
  }


  // Read a question by primary key 
  static async getById(questionId) {
    const response = await db.query(
      `SELECT question_id, topic_id, question, answer, options FROM question WHERE question_id = $1;`,
      [questionId]
    );
    if (response.rows.length === 0) return null;
    return new Question(response.rows[0]);
  }


  // Read all questions 
  static async getAll() {
    const response = await db.query(
      `SELECT question_id, topic_id, question, answer, options FROM question ORDER BY question_id;`
    );
    return response.rows.map(r => new Question(r));
  }

  // Read all questions for a given topic 
  static async getAllByTopic(topicId) {
    const response = await db.query(
      `SELECT question_id, topic_id, question, answer, options FROM question WHERE topic_id = $1 ORDER BY question_id;`,
      [topicId]
    );
    return response.rows.map(r => new Question(r));
  }

  
}

module.exports = Question;
