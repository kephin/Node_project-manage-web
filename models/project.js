const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  number: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Number,
    default: null,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
