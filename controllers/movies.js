const moviesModel = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const LackOfRights = require('../errors/lack-of-rights-err');

// Получить все фильмы
const getMovies = (req, res, next) => {
  const userId = req.user._id;
  moviesModel
    .find({})
    .then((movies) => {
      const moviesUser = movies.filter((movie) => movie.owner.toString() === userId);
      res.status(200).send(moviesUser);
    })
    .catch(next);
};

// Сохранить новый фильм
const createMovie = (req, res, next) => {
  moviesModel
    .create({ owner: req.user._id, ...req.body })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};
// Удалить фильм
const deleteMovieById = (req, res, next) => {
  const { _id } = req.params;
  const owner = req.user._id;

  moviesModel.findById(_id)
    .then((currentMovie) => {
      if (!currentMovie) {
        throw new NotFoundError('Такого фильма нет в базе данных');
      }

      if (currentMovie.owner.toString() === owner) {
        currentMovie.deleteOne()
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удалён' });
          })
          .catch(next);
      } else {
        throw new LackOfRights('Отсутствуют права на удаление этого фильма');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
