const router = require('express').Router();
const { errors } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');
const { checkUserInfo } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', checkUserInfo, updateUser);

router.use(errors());
module.exports = router;
