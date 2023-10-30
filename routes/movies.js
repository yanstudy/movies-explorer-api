const router = require('express').Router();
const { errors } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { checkIdMovie, checkMovieInfo } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', checkMovieInfo, createMovie);
router.delete('/movies/:_id', checkIdMovie, deleteMovieById);

router.use(errors());
module.exports = router;
