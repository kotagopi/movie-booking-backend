const Movie = require('../models/Movie');

exports.getAllMovies = async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const movie = Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({message: 'Movie not found'});
        }
        res.json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createMovie = async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        posterUrl: req.body.posterUrl,
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateMovie = async (req, res) => {
    try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    movie.title = req.body.title || movie.title;
    movie.description = req.body.description || movie.description;
    movie.rating = req.body.rating || movie.rating;
    movie.posterUrl = req.body.posterUrl || movie.posterUrl;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
}

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await movie.remove();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
