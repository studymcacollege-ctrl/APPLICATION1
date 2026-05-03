require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS - सभी origins allow करें (Codespaces के लिए जरूरी)
app.use(cors({
  origin: true, // सभी origins allow
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// 🔹 Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🚀 Backend Running!',
    cors: 'enabled',
    timestamp: new Date().toISOString()
  });
});

// 🔹 Signup API
app.post('/api/signup', async (req, res) => {
  console.log('📥 Signup request:', req.body);
  
  try {
    const { name, email, password, confirmPassword, agree } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password min 6 characters' });
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
      name,
      email: email.toLowerCase(),
      password: hashed,
      agreeToTerms: agree
    }).save();

    console.log('✅ User saved:', user.email);
    res.status(201).json({ 
      message: '✅ Signup successful!', 
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// 🔹 Login API
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
    
    res.json({ 
      message: '🎉 Login successful!', 
      success: true, 
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ✅ Server Start - 0.0.0.0 पर listen करें (Codespaces के लिए जरूरी)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 CORS: Enabled for all origins`);
  console.log(`🗄️  MongoDB: Connected`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/health`);
});