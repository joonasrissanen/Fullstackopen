const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let PORT = process.env.PORT || 3003;
let MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};