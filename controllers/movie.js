// Импорты
const Movie = require('../models/movie');// импортируем модель карточек
// импортируем ошибки и статусы ответов
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const {
  CREATED, OK,
} = require('../const/responses');
// Создаем контролеры для фильмов и экспортируем их
// GET /movies — возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(OK).send(movies))
    .catch(next);// переходим в централизованный обработчик ошибок
};
// POST /movies — создаёт фильм = добавляет в сохраненные
module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ountry: req.body.ountry,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailer: req.body.trailer,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => { // так то ошибки валидации быть не может, но пока что оставлю
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка добавления фильма в сохраненные, переданы некорректные данные'));
      } else {
        next(err);// переходим в централизованный обработчик ошибок
      }
    });
};
// DELETE /movies/:moviesId — удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((selectMovie) => {
      if (!selectMovie) { // проверяем наличие
        throw new NotFoundError('Нет фильма с таким id');
      } else { // если фильм есть в сохраненных, то удаляем
        Movie.findByIdAndRemove(movieId)
          .then((movie) => res.status(OK).send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка удаления фильма из сохраненных, передан некорректный id'));
      } else {
        next(err);
      }
    });
};
