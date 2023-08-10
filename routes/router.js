// Импорт
const router = require('express').Router();// создаем роутре
const moviesRouter = require('./movies');// импорт роута фильмов
const userRouter = require('./users');// импорт роута пользователя
const auth = require('../middlewares/auth');// импорт мидлвэра для авторизации
const NotFoundError = require('../errors/not-found-err');// импорт ошибки
// Обьединяем роуты в биг-роут
// используем роут для логина и регистрации, не нужна авторизация
router.use('/', require('./auth'));
// авторизация
router.use(auth);
// роуты которым нужна авторизация
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
// На случай запроса на неправильный путь
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
// Экспорт биг-роута
module.exports = router;
