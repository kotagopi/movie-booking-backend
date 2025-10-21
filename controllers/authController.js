const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};


exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({ message: 'Name, email and password required' });

        const existing = await User.findOne({email});
        if(existing) return res.status(409).json({message: 'User already exists'});

        // generate salt 
        const salt = await bcrypt.genSalt(10);

        // hash the password using salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user

        const newUser =  new User({
          name,
          email,
          password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

    const token = generateToken(user);

    res.json({token, user: {id: user._id, name: user.name, email: user.email, role: user.role}})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getMe = async (req, res) => {
  try {
    // auth middleware sets req.user
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};