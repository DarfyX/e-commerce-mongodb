const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require('connect-mongo');
require("./strategies/local");
require("./database");

// routes
const usersRouter = require("./routes/user");
const productsRouter = require("./routes/product");
const authRouter = require("./routes/auth");
// const cartRouter = require('./routes/cart')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// session config
app.use(
  session({
    secret: "hsg8f3487r",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1/ecommerce_db'
    })
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

// passport config
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);
// app.use('/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`E-commerce app listening on port ${PORT}`);
});
