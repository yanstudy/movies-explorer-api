const userModel = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

// Вернуть информацию о пользователе
const getUser = (req, res, next) => {
  const userId = req.user._id;

  userModel
    .findById(userId)
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// Обновить информацию о пользователе
const updateUser = (req, res, next) => {
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
};
