const { Schema, model } = require('mongoose');
const collectionName = 'User';

const userSchema = Schema(
  {
    _id: String,
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true, // Unique email for each user
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      // User Img
      type: String,
    },
    role: {
      // Role of user it will be (normal or admin)
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isRemove: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: collectionName,
    _id: false,
  }
);
module.exports = model(collectionName, userSchema);
