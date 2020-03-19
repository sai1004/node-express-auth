const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const authRoutes = require("./Routes/AuthController");

const port = 3000;

try {
  /*----- db -----*/

  mongoose
    .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then(() =>
      console.log(`
      
      DB Result:
      ----------------------------
      Successfully Connected To DB!
      ---------------------------- 
`)
    );

  // on error
  mongoose.connection.on("error", err =>
    console.log(` Error While Connecting To DB: ${err.message} `)
  );

  /* ''''''' middlewares ''''''''' */
  app.use(express.urlencoded({ extended: false }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logger("common"));

  app.use("/auth", authRoutes);

  /* ''''''' Start server ''''''''' */

  app.listen(port, err => {
    if (err) throw err;
    console.log(`
    *****************************************************
    NodeJs server is Listening on http://127.0.0.1:${port}
    ******************************************************
    `);
  });
} catch (err) {
  console.log(err);
}
