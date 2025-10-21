const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path to your User model

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/moviebooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function createUser() {
  const email = "test@example.com";
  const plainPassword = "mypassword123";

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  // create and save user
  const user = new User({
    name: 'Gopi',
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log("User created successfully");

  mongoose.connection.close(); // close DB connection
}

createUser();
