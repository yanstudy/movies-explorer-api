const router = require('express').Router();
const { login, logout, createUser } = require('../controllers/auth');
const { checkSigninInfo, checkSignupInfo } = require('../middlewares/validation');

router.post('/signin', checkSigninInfo, login);
router.post('/signup', checkSignupInfo, createUser);
router.post('/signout', logout);

module.exports = router;
