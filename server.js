require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
