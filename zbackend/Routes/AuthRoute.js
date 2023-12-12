const { Signup, Login, Questions, Question } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.get('/questions', Questions);
router.get('/question/:id', Question);

module.exports = router;