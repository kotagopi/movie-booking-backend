const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    language: { type: String, required: true, trim: true },
    posterUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", moveSchema);
module.exports = Movie;