const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use(authRouter);
router.use(auth);
router.use(usersRouter);
router.use(moviesRouter);
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
