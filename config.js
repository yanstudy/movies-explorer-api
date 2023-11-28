const SAULT_ROUNDS = 10;

// переменные окружения
const {
  JWT_SECRET = 'JWT', NODE_ENV = 'production', PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

// Список доступных урлов
const allowedCors = [
  'https://yanstudymovies.nomoredomainsrocks.ru',
  'http://yanstudymovies.nomoredomainsrocks.ru',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://yanstudymovies.nomoredomainsmonster.ru',
  'http://yanstudymovies.nomoredomainsmonster.ru',
];

module.exports = {
  SAULT_ROUNDS,
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DB_URL,
  allowedCors,
};
