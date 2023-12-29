const User = require("../Models/UserModel");
const Sub = require("../Models/SubModel");
const UserSub = require("../Models/UserSubModel");
const QnSub = require("../Models/QnSubModel");
const Question = require("../Models/QuestionModel");
const { createSecretToken } = require("../Util/SecretToken");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  const url = "https://leetcode-client.onrender.com";

  res.header("Access-Control-Allow-Origin", url);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  
  try {
    const { email, username,password} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error("Error signing up:", error);
  }

};

module.exports.Login = async (req, res, next) => {
  const url = "https://leetcode-client.onrender.com";

  res.header("Access-Control-Allow-Origin", url);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
       SameSite: 'none',
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.codeSubmit = async (req, res, next) => {
  const url = "https://leetcode-client.onrender.com";

  res.header("Access-Control-Allow-Origin", url);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  try{
    //this code is for handling post request
    const { code, lang, email, qid } = req.body;
    const isAccepted = Math.random() < 0.5;

    let sub = await Sub.findOne({ email });

    if (!sub){
      sub = await Sub.create({ email, ques: [] });
    }

    let qn = sub.ques.find(qn => qn.qid == qid);
    const question = await Question.findOne({ id: qid });

    if (!qn && question){
      const newSubmission = await QnSub.create({ sid: 0, code, lang, isAccepted });
      qn = await UserSub.create({ qid, qnSub: [newSubmission] });
      sub.ques.push(qn);
      await sub.save()
        .catch(err => console.log(err));
    }

    if (qn) {
      const sid = qn.qnSub.length;
      const newSubmission = await QnSub.create({ sid, code, lang, isAccepted });
      qn.qnSub.push(newSubmission);
      await qn.save()
        .catch(err => console.log(err));
      await sub.save()
        .catch(err => console.log(err));
    }

    res.status(201).json({ message: 'Submission created successfully',sub, isAccepted }); 
    // next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.Questions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.Question = async (req, res) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.Submissions = async (req, res) => {
  try {
    const submissions = await Sub.findOne({ email: req.params.email });
    const qidArray = [];
    submissions.ques.forEach(qn => {
      qidArray.push(qn.qid);
    })
    const questions = await Question.find({ id: { $in: qidArray } });
    res.json(questions);
    // res.json(submissions.ques.qid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.Submission = async (req, res) => {
  try {
    const user = await Sub.findOne({ email: req.params.email});
    const submission = user.ques.find(qn => qn.qid == req.params.id);
    // res.json(user);
    res.json(submission.qnSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}