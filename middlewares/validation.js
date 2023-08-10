const { celebrate, Joi } = require('celebrate');
// Регулярное выражение ссылок
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
// Валидация данных пользователя
// Логин(вход в аккаунт)
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});
// Регистрация(создание пользователя)
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});
// Обновление данных профиля
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    email: Joi.string().min(4).max(50).email()
      .required(),
  }),
});
// Валидация фильма
// Создание фильма
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
// Валидация id карточки
const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .required(),
  }),
});
// Экспорт
module.exports = {
  validateLogin,
  validateCreateUser,
  validateUpdateProfile,
  validateCreateMovie,
  validateMovieId,
};
