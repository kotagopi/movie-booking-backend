const express = require('express');
const router = express.Router();
const { getAllMovies, createMovie, updateMovie, deleteMovie, getMovieById } = require('../controllers/movieController');
const  protect  = require('../middleware/authMiddleware');



// public route anyone can use
router.get('/', getAllMovies);


// protected route only logged in users can use
router.get("/:id", getMovieById);

router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
