const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author',
    required: true 
  },
  genres: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Genre'
  }],
  description: { 
    type: String 
  },
  publish_year: { 
    type: Number 
  },
  cover_img: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MediaFile',
  },
  chapters: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chapter' 
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rating'
  }],
  avg_rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5 
  },
  views: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  followers: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  monthly_views: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'completed'],
    default: 'draft'
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date 
  }
});

// Update timestamp on save
bookSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Book', bookSchema);