// Импорты
const router = require('express').Router();// импорт + создаем роутер
const {
  updateProfile, getCurrentUser,
} = require('../controllers/users');// импортируем контролеры для пользователя
// Валидация
const {
  validateUpdateProfile,
} = require('../middlewares/validation');
// Настраиваем роут users, адрес: /users
// конролеры без валидации
router.get('/me', getCurrentUser);// при гет-запросе на получение данных текущего пользователя
// конролеры с валидацией
router.patch('/me', validateUpdateProfile, updateProfile);// при патч-запросе на обновление данных профиля используеться контролер updateProfile
// Экспорт роута
module.exports = router;
