const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const app = express()
// const PORT = process.env.PORT || 3001
const URL = 'https://leetcode-api-sandy.vercel.app';
// const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  cors({
    origin: ["https://leetcode-frontend-theta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cors());
app.use(jsonParser);
app.use(cookieParser());

mongoose.connect(MONGODB_URI);

app.get('/', (req, res) => {
  res.send('working:)');
})

app.use ('/', authRoute);

// app.listen(PORT, () => {
//   console.log(`listening`);
// })