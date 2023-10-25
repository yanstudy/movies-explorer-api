require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const appRouter = require('./routes/index');
const { login, createUser } = require('./controllers/auth');
const auth = require('./middlewares/auth');
const { checkSigninInfo, checkSignupInfo } = require('./middlewares/validation');
const { logout } = require('./controllers/auth');
const { PORT, DB_URL } = require('./config');
const { limiter } = require('./middlewares/limiter');

// База данных
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to db'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(requestLogger); // подключаем логгер запросов

// Незащищённые роуты
app.post('/signin', checkSigninInfo, login);
app.post('/signup', checkSignupInfo, createUser);
app.post('/signout', logout);

app.use(cookieParser());

// Авторизация
app.use(auth);

app.use(appRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

// Центральный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
