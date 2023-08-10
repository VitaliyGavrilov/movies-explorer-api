// подключаем модули и пакеты
require('dotenv').config();
const console = require('console');// шоб линтер не ругался как бабка
const express = require('express');// сервер
const mongoose = require('mongoose');// бд
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');// импорт логеров
// задаем переменные окружения
const { PORT = 3000, BASE_PATH = 'http://localhost:3000', MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;// переменные окружения
// запускаем сервер
const app = express();
// для корс ошибок
app.use(cors());
// подключаемся к бд
mongoose.connect(MONGO_URL)
  .then(() => console.log('Мы подлюченны к MongoDB'))
  .catch((err) => console.log(`Мы не подлюченны к MongoDB, ошибка: ${err}`));
// типо говорим с каким форматом данных будет работать наш сервер
app.use(express.json()); // анализирует входящие запросы JSON и помещает данные в req.body.
// подключаем логгер запросов
app.use(requestLogger);
// испоьзуем биг-роут
app.use('/', require('./routes/router'));
// подключаем логгер ошибок
app.use(errorLogger);
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// подключаем централизованный обработчик ошибок
app.use(require('./middlewares/errorHandling'));
// слушатель
app.listen(PORT, () => {
  console.log(`Сервер по адресу ${BASE_PATH} отлично работает, порт: ${PORT}`);
});
