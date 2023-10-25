const SAULT_ROUNDS = 10;

// переменные окружения
const {
  JWT_SECRET = 'JWT', NODE_ENV, PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = {
  SAULT_ROUNDS,
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DB_URL,
};
