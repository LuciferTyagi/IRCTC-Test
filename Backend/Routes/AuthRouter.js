const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/authMiddleware');

const router = require('express').Router();

router.post('/login',  login);
router.post('/signup',  signup);

module.exports = router;