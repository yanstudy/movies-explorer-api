const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const AuthError = require('../errors/auth-err');
const { SAULT_ROUNDS, JWT_SECRET, NODE_ENV } = require('../config');

// Создание пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, SAULT_ROUNDS, (error, hash) => {
    userModel.create({
      email, password: hash, name,
    })
      .then((newUser) => {
        const { password: hashPassword, _id, ...userWithoutPassword } = newUser.toObject();
        const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT', { expiresIn: '7d' });
        res.status(201).cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        }).send(userWithoutPassword);
      })
      .catch(next);
  });
};

// Вход в систему
const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError('Такого пользователя не существует');

      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) throw new AuthError('Логин или пароль неправильный');

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT', { expiresIn: '7d' });

          return res.status(200).cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            SameSite: 'none',
            secure: true,
          }).send({ message: 'Вы вошли в аккаунт' });
        });
    })
    .catch(next);
};

// Выход из системы
const logout = (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Вы успешно вышли из системы' });
};

module.exports = {
  createUser,
  login,
  logout,
};
