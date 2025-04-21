require('dotenv').config();

const api = require('./api');

api.listen(process.env.PORT, () => {
  console.log(`API listenting on port ${process.env.PORT}`);
});
