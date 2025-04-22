const fs = require('fs');
const db = require('./connect');

const sql = fs.readFileSync('./src/db/setup.sql').toString();

db.query(sql)
  .then(data => {
    db.end();
    console.log('DB setup complete.');
  })
  .catch(err => console.log(err));
