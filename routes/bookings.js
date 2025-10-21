const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const  protect  = require("../middleware/authMiddleware");

// Routes
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.post("/", protect, bookingController.createBooking);
router.put("/:id", protect, bookingController.updateBooking);
router.delete("/:id", protect, bookingController.deleteBooking);

module.exports = router;
