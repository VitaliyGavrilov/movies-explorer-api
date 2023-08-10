// подключаем модули и пакеты
require('dotenv').config();
const console = require('console');// шоб линтер не ругался как бабка
const express = require('express');// сервер
const mongoose = require('mongoose');// бд
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');// импорт логеров
// задаем переменные окружения
const { PORT = 3000, BASE_PATH = 'http://localhost:3000', MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;// переменные окружения
// запускаем сервер
const app = express();
// подключаем
app.use(cors()); // для корс ошибок
app.use(helmet()); // для установки заголовков, связанных с безопасностью.
app.use(apiLimiter);// число запросов с одного IP в единицу времени ограничено.
mongoose.connect(MONGO_URL) // подключаемся к бд
  .then(() => console.log('Мы подлюченны к MongoDB'))
  .catch((err) => console.log(`Мы не подлюченны к MongoDB, ошибка: ${err}`));
app.use(express.json()); // анализирует входящие запросы JSON и помещает данные в req.body.
app.use(requestLogger); // подключаем логгер запросов
// роуты
app.use('/', require('./routes/router')); // испоьзуем биг-роут
// обработчики ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(require('./middlewares/errorHandling')); // подключаем централизованный обработчик ошибок
// слушатель
app.listen(PORT, () => {
  console.log(`Сервер по адресу ${BASE_PATH} отлично работает, порт: ${PORT}`);
});
