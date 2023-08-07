const mongoose = require('mongoose');// подключаем монго
const validator = require('validator');// подключаем валидатор
// создаем схему для карточки
const movieSchema = new mongoose.Schema({
  country: {
  // страна создания фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  director: {
  // режиссёр фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  duration: {
  // длительность фильма. Обязательное поле-число.
    type: Number,
    required: true,
  },
  year: {
  // год выпуска фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  description: {
  // описание фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  image: {
  // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Некорректная ссылка на изображение карточки',
    },
  },
  trailerLink: {
  // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Некорректная ссылка на изображение карточки',
    },
  },
  thumbnail: {
  // миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом
    type: String,
    required: true,
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Некорректная ссылка на изображение карточки',
    },
  },
  owner: {
  // _id пользователя, который сохранил фильм. Обязательное поле.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
  // id фильма, из ответа сервиса MoviesExplorer. Обязательное поле в формате number.
    type: Number,
    required: true,
  },
  nameRU: {
  // название фильма на русском языке. Обязательное поле-строка.
    type: String,
    required: true,
  },
  nameEN: {
  // название фильма на английском языке. Обязательное поле-строка.
    type: String,
    required: true,
  },
});
// создаем на основек схемы модель и экспортируем ее
module.exports = mongoose.model('movie', movieSchema);
