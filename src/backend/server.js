// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully!'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  agreeToTerms: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});
const User = mongoose.model('User', userSchema);

// 🔹 ROUTES - 404 se PEHLE define karein!

// 1. Health Check
app.get('/api/health', (req, res) => {
  console.log('✅ Health check');
  res.json({ 
    status: 'OK', 
    message: '🚀 Backend Running!',
    cors: 'enabled',
    timestamp: new Date().toISOString()
  });
});

// 2. Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, agree } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password min 6 chars' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords not matching' });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed,
      agreeToTerms: agree
    }).save();
    res.status(201).json({ message: '✅ Signup successful!', success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Signup:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 3. Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: '🎉 Login successful!', success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Login:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 4. Forgot Password - Verify Email
app.post('/api/forgot-password/verify-email', async (req, res) => {
  console.log('📧 Verify email:', req.body);
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'Email not registered' });
    }
    console.log('✅ Email verified:', user.email);
    res.json({ success: true, message: 'Email verified', user: { email: user.email, name: user.name } });
  } catch (err) {
    console.error('❌ Verify:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 5. Forgot Password - Reset
app.post('/api/forgot-password/reset', async (req, res) => {
  console.log('🔄 Reset password:', req.body);
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password min 6 chars' });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'Passwords not matching' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Wrong current password' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.updatedAt = new Date();
    await user.save();
    console.log('✅ Password updated:', user.email);
    res.json({ success: true, message: '✅ Password updated!' });
  } catch (err) {
    console.error('❌ Reset:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ✅ 404 Handler - SABSE LAST MEIN!
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.path);
  res.status(404).json({ error: 'API endpoint not found' });
});

// ✅ Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🌐 CORS: Enabled`);
  console.log(`🗄️  MongoDB: Connected`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/health`);
});