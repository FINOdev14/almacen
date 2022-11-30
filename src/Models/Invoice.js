const {  Schema, model} = require('mongoose');
const collectionName = 'InvoiceModel';

const invoiceSchema = Schema(
  {
    _id: String,
    number: Number,
    ivaPercentage: Number,
    subtotal: Number,
    products: Object,
    numProduct: Number,
    totalIva: Number,
    total: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove: { type: Boolean, default: false },
  },
  {
    collection: collectionName,
    _id: false,
  }
);
module.exports = model ( collectionName, invoiceSchema);