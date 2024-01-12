const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require('express-session');
const app = express();
const serverless = require("serverless-http");
const passport = require('passport'); 
const corsOpts = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOpts));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
// Use the session middleware
app.use(
  session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    throw new Error(err.message);
  });
module.exports = app;
module.exports.handler = serverless(app);
