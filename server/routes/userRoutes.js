import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create or update user
router.post('/', async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ uid });
    
    if (user) {
      // Update existing user
      user.email = email;
      user.displayName = displayName;
      user.photoURL = photoURL;
      await user.save();
    } else {
      // Create new user
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        savedNews: [],
        likedNews: [],
        preferences: {
          notifications: {
            emailDigest: true,
            stockAlerts: false,
            breakingNews: true,
            weeklyReport: true
          }
        }
      });
      
      await user.save();
    }
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Error creating/updating user', error: error.message });
  }
});

// Get user by UID
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Get user's saved news
router.get('/:uid/saved-news', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate('savedNews');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.savedNews);
  } catch (error) {
    console.error('Error fetching saved news:', error);
    res.status(500).json({ message: 'Error fetching saved news', error: error.message });
  }
});

// Get user's liked news
router.get('/:uid/liked-news', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate('likedNews');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.likedNews);
  } catch (error) {
    console.error('Error fetching liked news:', error);
    res.status(500).json({ message: 'Error fetching liked news', error: error.message });
  }
});

// Update user profile
router.put('/:uid/profile', async (req, res) => {
  try {
    const { displayName, notifications } = req.body;
    
    const user = await User.findOne({ uid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user profile
    if (displayName) {
      user.displayName = displayName;
    }
    
    if (notifications) {
      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };
    }
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

export default router;