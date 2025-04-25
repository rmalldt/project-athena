DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS topic CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS score CASCADE;



CREATE TABLE student (
  student_id INT GENERATED ALWAYS AS IDENTITY,
  username  TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id)
);

INSERT INTO student (username, email, password) 
VALUES ('jim', 'jim@student.com', 'Password123-');

CREATE TABLE topic (
  topic_id INT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL,
  PRIMARY KEY (topic_id)
);

INSERT INTO topic (title, description, video_url) 
VALUES 
('Ancient Egypt', 'A video on the history about the Ancient Egypt civilization.', 'https://www.youtube.com/embed/quIjo6P9DQE?si=pSH8x_QtRlMRdkOH'),
('Persian Empire', 'A video on the history about the Persian empire.', 'https://www.youtube.com/watch?v=yN4F25Of3E4'),
('Ancient China', 'A video on the history about the Ancient China.', 'https://www.youtube.com/watch?v=uZ-yjGDrRM8'),
('The Tudors', 'A video on the history about The Tudors.', 'https://www.youtube.com/watch?v=uvy-Dy3D8Fc');

CREATE TABLE question (
  question_id INT GENERATED ALWAYS AS IDENTITY,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic_id INT NOT NULL,
  PRIMARY KEY (question_id),
  FOREIGN KEY (topic_id) REFERENCES topic (topic_id)
);

INSERT INTO question (question, options, answer, topic_id)
VALUES ('Why did Henry VIII break away from the Roman Catholic Church?', 'Money,Power,Divorce,War', 'Divorce', 4),
('How many wives did Henry VIII have?', 'Four,Five,Six,Seven', 'Six', 4),
('What is the name of Henry VIIIs only son?', 'Edward,James,Henry,William', 'Edward', 4),
('What religion did Henry VIII create?', 'Catholicism,Protestantism,Islam,Buddhism', 'Protestantism', 4),
('Which wife of Henry VIII survived him?', 'Anne,Jane,Catherine,Katherine', 'Catherine', 4);

CREATE TABLE score (
  score_id INT GENERATED ALWAYS AS IDENTITY,
  score INT DEFAULT 0,
  student_id INT NOT NULL,
  topic_id INT NOT NULL,
  PRIMARY KEY (score_id),
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (topic_id) REFERENCES topic (topic_id)
);

INSERT INTO score (score, student_id, topic_id)
VALUES (80, 1, 4);





