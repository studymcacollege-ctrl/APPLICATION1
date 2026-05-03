const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// 🔹 GET ALL USERS (For Admin Table View) - Protected Route
router.get('/users', auth, async (req, res) => {
  try {
    // Optional: Only allow admin users (add isAdmin field in User model if needed)
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    // Format for table display
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      joined: user.createdAt.toLocaleDateString('en-IN', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }),
      agreeToTerms: user.agreeToTerms
    }));

    res.json({ success: true, count: formattedUsers.length, data: formattedUsers });
  } catch (err) {
    console.error('Fetch users error:', err.message);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

module.exports = router;