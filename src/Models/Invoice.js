const {  Schema, model} = require('mongoose');
const collectionName = "invoice";

const invoiceSchema = Schema ({
    _id: String,
    numInvoce: Number,
    producto: Object,
    numProduct: Number,
    infoInvoice: Object,
    Total:Number,
    Iva: Number,
    iva: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove: { type: Boolean, default: false }
},{
    collection: collectionName,
    _id: false
});
module.exports = model ( collectionName, invoiceSchema);