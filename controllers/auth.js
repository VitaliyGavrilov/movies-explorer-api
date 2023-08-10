// Импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');// импортируем модель пользователей
// импортируем ошибки и статусы ответов
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  CREATED,
} = require('../const/responses');
// Создаем контролеры для создания пользователя и входа в аккаунт
// POST /signin — вход в аккаунт
module.exports.login = (req, res, next) => {
  // деструктуризацие получаем данные из тела запроса
  const { email, password } = req.body;
  // проверяем данные методом модели
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
// POST /signup — регистрация, создаёт пользователя
module.exports.createUser = (req, res, next) => { // создаем контролер для пост-запроса
  // деструктуризацие получаем данные из тела запроса
  const {
    email, password, name,
  } = req.body;
  // хеширование пароля
  bcrypt.hash(password, 10)
    // создаем пользователя
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    // отправляем ответ= данные созданного пользователя, без пароля
    .then((user) => res.status(CREATED).send({
      _id: user._id, email, name,
    }))
    // обрабатываем ошибки
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка регистрации, переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Ошибка регистрации, пользователь с указанной почтой уже существует'));
      } else {
        next(err);
      }
    });
};
