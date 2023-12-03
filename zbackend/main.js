const express = require('express')
const app = express()
const port = 3000

const users = [];
const questions = [
  {
    id: 1,
    question: 'find maximum element in an array',
    testCase: [{
      input: [1, 2, 3, 4, 5],
      output: 5
    }]
  },
  {
    id: 2,
    question: 'find middle element in an array',
    testCase: [{
      input: [1, 2, 3, 4, 5],
      output: 3
    }]
  }
];

const submissions = [];


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/signup', (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Check if email already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Save email and password in users array
  const newUser = { email, password };
  users.push(newUser);

  res.status(200).json({ message: 'Signup successful' });
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
  res.send(200).json(questions);
  // res.send(questions);
})


app.post('/add-question', (req, res) => {
  const { id, question, testCase, userId } = req.body;

  const isAdmin = users.find(user => user.email === userId && user.isAdmin);

  if (!isAdmin){
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newQuestion = {
    id,
    question,
    testCase
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