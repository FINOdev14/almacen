const { Schema, model } = require('mongoose');
const collectionName = "product";

const productSchema = Schema({
    _id: String,
    categoyId: String,
    nameProduct: String,
    description: String,
    valorProduct: Number,
    totalNumber: Number,
    onSale: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove:  { type: Boolean, default: false }
},{
    timestamp: true, 
    collection: collectionName,
    _id:false
});

module.exports = model ( collectionName, productSchema );