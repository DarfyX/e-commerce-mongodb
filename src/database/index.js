const mongoose = require('mongoose')
require('dotenv').config();

// mongodb atlas config
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
// mongoose.connect(`mongodb+srv://${db_username}:${db_password}@test-server.g1jcfjd.mongodb.net/ecommerce_db?retryWrites=true&w=majority`)

// mongodb compass
mongoose.connect('mongodb://127.0.0.1/ecommerce_db')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));