import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['business', 'stock', 'general'],
      default: 'general',
    },
    savedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

export default News;