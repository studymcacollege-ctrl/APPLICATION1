// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS - Works with Local + Codespaces + Gitpod
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.options('*', cors()); // Handle preflight requests

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected Successfully!'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Password by default return nahi hoga queries mein
  },
  agreeToTerms: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date 
  }
});

const User = mongoose.model('User', userSchema);

// 🔹 ROUTES - 404 handler se PEHLE define karein (IMPORTANT!)

// 1. ✅ Health Check API
app.get('/api/health', (req, res) => {
  console.log('✅ Health check requested');
  res.json({ 
    status: 'OK', 
    message: '🚀 Quiz Master Backend is Running!',
    cors: 'enabled',
    timestamp: new Date().toISOString()
  });
});

// 2. ✅ Signup API - POST /api/signup
app.post('/api/signup', async (req, res) => {
  console.log('📥 Signup request:', req.body);
  
  try {
    const { name, email, password, confirmPassword, agree } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered. Please login.' });
    }

    // Hash password with bcrypt (secure)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('🔐 Password hashed successfully');

    // Create and save new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      agreeToTerms: agree || false
    });
    
    await newUser.save();
    console.log('✅ User saved to MongoDB:', newUser.email);

    res.status(201).json({ 
      message: '✅ Signup successful! Please login.', 
      success: true,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 3. ✅ Login API - POST /api/login (LoginPage.jsx ke liye)
app.post('/api/login', async (req, res) => {
  console.log('🔐 Login request:', req.body);
  
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter email and password' });
    }

    // Find user WITH password field (select('+password') zaroori hai)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ error: 'User not found. Please sign up first.' });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('❌ Wrong password for:', email);
      return res.status(400).json({ error: 'Wrong password. Please try again.' });
    }

    // Generate JWT token for session
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    console.log('🔑 Token generated for:', user.email);

    // Success response
    res.json({ 
      message: '🎉 Login successful!',
      success: true,
      token: token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });

  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 4. ✅ Forgot Password: Verify Email - POST /api/forgot-password/verify-email
app.post('/api/forgot-password/verify-email', async (req, res) => {
  console.log('📧 Verify email request:', req.body);
  
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ error: 'This email is not registered. Please sign up first.' });
    }

    console.log('✅ Email verified:', user.email);
    
    res.json({ 
      success: true, 
      message: 'Email verified successfully',
      user: { email: user.email, name: user.name }
    });

  } catch (err) {
    console.error('❌ Verify Email Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 5. ✅ Forgot Password: Reset Password - POST /api/forgot-password/reset
app.post('/api/forgot-password/reset', async (req, res) => {
  console.log('🔄 Reset password request:', req.body);
  
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validation
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({ error: 'New password must be different from old password' });
    }

    // Find user WITH password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect. Please try again.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();

    console.log('✅ Password updated for:', user.email);
    
    res.json({ 
      success: true, 
      message: '✅ Password updated successfully!' 
    });

  } catch (err) {
    console.error('❌ Reset Password Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 6. ✅ Get Current User (Protected) - GET /api/user
app.get('/api/user', async (req, res) => {
  try {
    const token = req.headers['x-auth-token'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user without password
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });

  } catch (err) {
    console.error('❌ Get User Error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// ✅ 404 Handler - SABSE LAST MEIN (IMPORTANT!)
app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.path);
  res.status(404).json({ error: 'API endpoint not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start Server - 0.0.0.0 par listen kare (Codespaces ke liye zaroori)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 CORS: Enabled for all origins (Local + Codespaces + Gitpod)`);
  console.log(`🗄️  MongoDB: Connected to Atlas`);
  console.log(`🧪 Test Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Available APIs:`);
  console.log(`   POST /api/signup`);
  console.log(`   POST /api/login`);
  console.log(`   POST /api/forgot-password/verify-email`);
  console.log(`   POST /api/forgot-password/reset`);
  console.log(`   GET  /api/user (with token)`);
});