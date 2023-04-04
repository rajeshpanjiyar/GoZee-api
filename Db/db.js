const mongoose = require("mongoose");
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();

const connectDb = () => {
  //Database connection
  mongoose
    .connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverApi: ServerApiVersion.v1
    })
    .then(() => {
      console.log("Database CONNECTED");
    })
    .catch(() => {
      console.log("UNABLE to connect to Database");
    });
}

connectDb();
module.exports = connectDb;
