//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const history = require('connect-history-api-fallback');

mongoose.set('useFindAndModify', false);


const app = express();
const port = process.env.PORT || 5001;

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(history());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));


  app.use('/api', require('./routes/routes'))

  //start server
  app.listen(port, () => console.log(`sever running at http://localhost:${port}`))