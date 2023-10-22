const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const serverless = require("serverless-http");
const corsOpts = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.use(express.json());
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(logger);
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
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
