const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = 3000
const MONGODB_URI = process.env.MONGODB_URI;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);

mongoose.connect(MONGODB_URI);

let usersSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = mongoose.model("User", usersSchema);

let iosSchema = new mongoose.Schema({
  input: [Number],
  output: Number
})

const IO = mongoose.model("IO", iosSchema);

let questionsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  difficulty: String,
  acceptance: String,
  io: [iosSchema]
})

const Question = mongoose.model("Question", questionsSchema);

const users = [];

const submissions = [];


app.get('/', (req, res) => {
  res.json(users);
})


app.post('/signup', (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Check if email already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Save email, password and isAdmin in users array
  const newUser = { email, password, isAdmin };
  users.push(newUser);

  // Respond with status 200 and the new user
  res.status(200).json({message: 'success'});
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
})


app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/question/:id', async (req, res) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/add-question', (req, res) => {
  const { title, difficulty, acceptance, io , userId } = req.body;

  const isAdmin = users.find(user => user.email === userId && user.isAdmin);

  if (!isAdmin){
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newQuestion = {
    id: questions.length,
    title,
    difficulty,
    acceptance,
    io
  };
  
  questions.push(newQuestion);

  res.status(200).json({ message: 'Question added successfully' });

})


app.post('/submissions', (req, res) => {
  //let the user submit the code and randomly accept or reject the solution
  //then store the submission in submissions array

  const { userId, questionId , code} = req.body;

  // randomly accept or reject the solution
  const isAccepted = Math.random() < 0.5;

  // store the submission in submissions array
  const submission = {
    userId,
    questionId,
    code,
    isAccepted
  };

  submissions.push(submission);

  res.status(200).json({ message: 'Submission stored successfully' });
  
})


app.listen(port, () => {
  console.log(`listening at ${port}`)
})