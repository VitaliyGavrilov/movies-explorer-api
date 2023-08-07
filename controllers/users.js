// Импорты
const User = require('../models/user');// импортируем модель пользователей
// импортируем ошибки и статусы ответов
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const {
  OK,
} = require('../const/responses');
// Создаем контролеры для взаимодейтвия с данными пользователей и сразу экспортируем их
// GET /users/me - возвращает информацию о текущем пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch(next);// переходим в централизованный обработчик ошибок
};
// PATCH /users/me — обновляет профиль (email и имя)
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка обновления данных профиля, переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
