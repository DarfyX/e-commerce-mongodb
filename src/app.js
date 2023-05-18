const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose')
require('./strategies/local');
require('dotenv').config()

// routes
const usersRouter = require('./routes/users')
// const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
// const cartRouter = require('./routes/cart')

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@test-server.g1jcfjd.mongodb.net/ecommerce_db?retryWrites=true&w=majority`)

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// session config
app.use(
    session({
        secret:'hsg8f3487r',
        saveUninitialized: false,
        resave: false,
    })
);

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
})

// passport config
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
// app.use('/products', productsRouter);
app.use('/auth', authRouter);
// app.use('/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`E-commerce app listening on port ${PORT}`)
  });