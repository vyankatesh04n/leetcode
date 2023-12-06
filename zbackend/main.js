const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);

const users = [];

const questions = [
  {
    id: 0,
    title: 'find maximum element in an array',
    difficulty: 'easy',
    acceptance: '52%',
    io: [{
      input: [1, 2, 3, 4, 5],
      output: 5
    },
    {
      input: [4, 2, 9, -3, 5],
      output: 9
    }]
  },
  {
    id: 1,
    title: 'Remove Linked List Elements',
    difficulty: 'hard',
    acceptance: ' 30%',
    io: [{
      input: [1, 2, 3, 4, 5],
      output: 5
    },
    {
      input: [4, 2, 9, -3, 5],
      output: 9
    }]
  },
  {
    id: 2,
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'medium',
    acceptance: ' 45%',
    io: [{
      input: [1, 2, 3, 4, 5],
      output: 5
    },
    {
      input: [4, 2, 9, -3, 5],
      output: 9
    }]
  }
];

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


app.get ('/questions', (req, res) => {
  // res.sendStatus(200).json(questions);
  res.json(questions);
})


app.get('/question/:id', (req, res) => {
  const { id } = req.params;
  // const question = questions.find(q => q.id === parseInt(id));
  // res.json(question);
  res.json(questions[parseInt(id, 10)]);
})


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