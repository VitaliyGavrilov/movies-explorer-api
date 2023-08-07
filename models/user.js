const mongoose = require('mongoose');// подключаем монго
const validator = require('validator');// подключаем валидатор
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
// создаем схему пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // свойство обязательное
    unique: true, // значение должно быть уникальным
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректная электронная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // необходимо добавить поле select, чтобы API не возвращал хеш пароля
  },
  name: {
    type: String,
    minlength: 2, // мин.длин
    maxlength: 30, // макс.длин
    required: true,
    default: 'Пользователь', // значение по умолчанию
  },
});
// добавляем метод для схемы, он проверяет почту и пароль при входе в аккаунт
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // ищем пользователя по почте
  return this.findOne({ email }).select('+password')
    // если пользователя с такой почтой нет
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      // если есть - сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          // получаем пользователя
          return user;
        });
    });
};
// создаем на основек схемы модель и экспортируем ее
module.exports = mongoose.model('user', userSchema);
