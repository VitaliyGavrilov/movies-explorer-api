// Импорт
const rateLimiter = require('express-rate-limit'); // для ограничения числа запросов с одного IP в единицу времени
// Настройка
const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // время, в течение которого разрешены несколько запросов в мс.
  max: 100, // максимальное количество запросов
  standardHeaders: true, // // Возвращает информацию об ограничении скорости в заголовках RateLimit
  legacyHeaders: false, // Отключает устаревшие заголовки X-RateLimit
});
// Экспорт
module.exports = { apiLimiter };
