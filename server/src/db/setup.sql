DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;

CREATE TABLE student (
    student_id INT GENERATED ALWAYS AS IDENTITY,
    username  TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id)
);


INSERT INTO student (username, email, password) 
VALUES ('jim', 'jim@student.com', 'Password123-')


CREATE TABLE topic (
  topic_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id INT NOT NULL
    REFERENCES student(student_id)
    ON DELETE CASCADE,
  video_url  TEXT NOT NULL
);

