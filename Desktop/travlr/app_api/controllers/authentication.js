const User = require('../models/user');
const passport = require('passport');

// Register a new user
const register = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { email, name, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Validate required fields
    if (!email || !name || !password) {
      return res.status(400).json({ 
        message: 'Email, name, and password are required',
        received: { email: !!email, name: !!name, password: !!password }
      });
    }
    
    // Create new user
    const user = new User({
      email,
      name
    });
    
    // Set password (this will hash it with salt)
    user.setPassword(password);
    
    // Save user to database
    await user.save();
    
    // Generate JWT token
    const token = user.generateJWT();
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
const login = (req, res, next) => {
  // Validate message to ensure that email and password are present.
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({"message": "All fields required"});
  }
  
  // Delegate authentication to passport module
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Error in Authentication Process
      return res
        .status(500)
        .json({ message: 'Authentication error', error: err.message });
    }
    if (user) { // Auth succeeded - generate JWT and return to caller
      const token = user.generateJWT();
      res
        .status(200)
        .json({token});
    } else { // Auth failed return error
      res
        .status(401)
        .json(info || { message: 'Authentication failed' });
    }
  })(req, res, next);
};

module.exports = {
  register,
  login
};
