const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingsController");
const auth = require('../middleware/authMiddleware');

// Routes
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.post("/", auth,bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
