const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const app = express()
const port = 3000
const MONGODB_URI = process.env.MONGODB_URI;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cors());
app.use(jsonParser);
app.use(cookieParser());

mongoose.connect(MONGODB_URI);

app.get('/', (req, res) => {
  res.json(users);
})

app.use ('/', authRoute);

app.listen(port, () => {
  console.log(`listening at ${port}`)
})