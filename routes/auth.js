// Импорты
const router = require('express').Router();// создае роутер
const {
  login, createUser,
} = require('../controllers/auth');// импортируем котнролеры
// Валидация
const {
  validateLogin, validateCreateUser,
} = require('../middlewares/validation');
// Настраиваем роутер регистрации и логина, адрес: /
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
// Экспортируем роутер
module.exports = router;
