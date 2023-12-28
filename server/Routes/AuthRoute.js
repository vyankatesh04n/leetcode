const { Signup, Login, Questions, Question, codeSubmit, Submissions, Submission } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.post('/submit-code', codeSubmit);
router.get('/questions', Questions);
router.get('/question/:id', Question);
router.get('/submissions/:email', Submissions);
router.get('/submission/:email/:id', Submission);

module.exports = router;