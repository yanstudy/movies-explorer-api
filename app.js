require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const appRouter = require('./routes/index');
const { PORT, DB_URL } = require('./config');
const { limiter } = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

// База данных
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to db'));

const app = express();
app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);

app.use(cookieParser());

app.use(appRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

// Центральный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
