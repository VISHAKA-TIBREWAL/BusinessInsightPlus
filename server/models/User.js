import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    savedNews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
    }],
    likedNews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
    }],
    preferences: {
      notifications: {
        emailDigest: {
          type: Boolean,
          default: true,
        },
        stockAlerts: {
          type: Boolean,
          default: false,
        },
        breakingNews: {
          type: Boolean,
          default: true,
        },
        weeklyReport: {
          type: Boolean,
          default: true,
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;