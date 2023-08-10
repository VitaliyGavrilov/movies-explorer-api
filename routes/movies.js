// Импорты
const router = require('express').Router();// создае роутер
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');// импортируем котнролеры
// Валидация
const {
  validateCreateMovie, validateMovieId,
} = require('../middlewares/validation');
// Настраиваем роутер фильмов, адрес: /movie
// для /
router.get('/', getMovies);// при гет-запросе всех сохран.фильмов
router.post('/', validateCreateMovie, createMovie);// при пост-запросе для создания фильма(добавление в сохр.)
// для /movieId
router.delete('/:movieId', validateMovieId, deleteMovie);// при делит-запросе для удаления фильма из сохран.
// Экспортируем роутер
module.exports = router;
