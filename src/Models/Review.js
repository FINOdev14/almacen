const { Schema, model } = require('mongoose');
const collectionName = "review";

const reviewSchema = Schema({
  _id: String,
  description:String,
  noteId: Number,
  productId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false }
},{
  collection: collectionName,
  _id: false
});
module.exports = model( collectionName, reviewSchema);

