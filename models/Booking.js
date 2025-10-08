const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  customerName: { type: String, required: true },
  seats: [{ type: String, required: true }], // Array of seat numbers
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
