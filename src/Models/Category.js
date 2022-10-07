const {  Schema, model} = require('mongoose');
const collectionName = "category";

const categorySchema = Schema ({
    _id: String,
    nameCategory:String,
    stock:Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove: { type: Boolean, default: false }
},{
    collection: collectionName,
    _id: false
});
module.exports = model ( collectionName, categorySchema);